import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IMqttMessage, MqttService, MqttConnectionState } from 'ngx-mqtt';
import { Control, Category, Room } from '../interfaces/datamodel'
import { MqttTopics } from '../interfaces/mqtt.api'
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoxBerry {

  private MqttSubscription: Subscription[] = [];

  private controlsSubject: BehaviorSubject<Control[]> = new BehaviorSubject([]);
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  private roomsSubject: BehaviorSubject<Room[]> = new BehaviorSubject([]);

  private Structure: any = {};

  private mqtt_lox2app: any = {};
  private mqtt_topic_list: string[] = [];

  private registered_topics: string[] = [];

  private loxberryMqttIP: string = '';
  private loxberryMqttPort: string = '';
  private loxberryMqttUsername: string = '';
  private loxberryMqttPassw: string = '';
  private loxberryMqttConnected: boolean = false;
  private loxberryMqttAppTopic: string = '';

  public getControls() {
    return this.controlsSubject.asObservable();
  }

  public getCategories() {
    return this.categoriesSubject.asObservable();
  }

  public getRooms() {
    return this.roomsSubject.asObservable();
  }

  constructor(private http: HttpClient,
    private mqttService: MqttService,
    private storageService: StorageService)
  {
    this.Structure.controls = {};
    this.Structure.categories = {};
    this.Structure.rooms = {};

    this.storageService.getSettings().subscribe( settings => {
      if (settings) {
        this.loxberryMqttIP = settings.loxberryMqttIP;
        this.loxberryMqttPort = settings.loxberryMqttPort;
        this.loxberryMqttUsername = settings.loxberryMqttUsername;
        this.loxberryMqttPassw = settings.loxberryMqttPassw;
        this.loxberryMqttAppTopic = settings.loxberryMqttAppTopic;

        // only connect if all configuration options are valid
        if (!this.loxberryMqttConnected
             && this.loxberryMqttUsername
             && this.loxberryMqttPassw
             && this.loxberryMqttIP
             && this.loxberryMqttPort
             && this.loxberryMqttAppTopic) {
          this.connectToMqtt();
          this.registerStructureTopic();
        }
      }
    });

    this.mqttService.state.subscribe((s: MqttConnectionState) => {
      const status = s === MqttConnectionState.CONNECTED ? 'connected' : 'disconnected';
      console.log('LoxBerry Mqtt client connection status: ', status);
  });
  }

  private connectToMqtt() {
    console.log('Connecting to LoxBerry Mqtt Broker...');
    this.mqttService.connect(
    {
      username: this.loxberryMqttUsername,
      password: this.loxberryMqttPassw,
      hostname: this.loxberryMqttIP,
      port: Number(this.loxberryMqttPort)
    });
    this.loxberryMqttConnected = true;
  }

  private registerStructureTopic() {
    let topic = this.loxberryMqttAppTopic + '/structure';
    this.MqttSubscription.push( this.mqttService.observe(topic)
      .subscribe((message: IMqttMessage) => {
        let msg = message.payload.toString();
        if (msg.length == 0 )
          this.flushData();
        else
          this.ProcessStructure(JSON.parse(msg));
    }));
  }

  private flushData() {
    console.log("flush structure...");
    this.Structure.controls = {};
    this.Structure.categories = {};
    this.Structure.rooms = {};

    this.controlsSubject.next(Object.values(this.Structure.controls));
    this.categoriesSubject.next(Object.values(this.Structure.categories));
    this.roomsSubject.next(Object.values(this.Structure.rooms));
  }

  private processControl(control: any, name: string) {
    Object.keys(control).forEach(key => {
       if (typeof control[key] === 'object' && control[key] !== null) {
         this.processControl(control[key], name + '/' + key);
         if (control[key].mqtt) control[key] = ""; // remove mqtt object
       }
       else {
         if (key === 'mqtt') {
            //console.log('element name, value:', name,  control[key] );
            this.mqtt_lox2app[control[key]] = name;
            this.registerTopic(control[key]);
         }
       }
    });
    return control;
  }

  private addDisplayFields(control) {
    if (!control.display) control.display = { text: "", color: null, toggle: false};
    if (control.subcontrols) {
      Object.keys(control.subcontrols).forEach(key => {
        let subcontrol = control.subcontrols[key];
        if (!subcontrol.display) subcontrol.display = { text: "", color: null, toggle: false };
        if (!subcontrol.icon) subcontrol.icon = { href: "", color: null };
      });
    }
    return control;
  }

  private registerTopic(value: string) {
    let prefix = value.split('/')[0];
    if (!this.mqtt_topic_list.find( item => { return item === prefix }))
        this.mqtt_topic_list.push(prefix);
  }

  // TODO: only items will be added, not removed
  private ProcessStructure(obj: any) {
    if (!obj) return;

    Object.keys(obj.controls).forEach( key => {
      let control = this.addDisplayFields(obj.controls[key]); // TODO move elsewhere
      let name = this.loxberryMqttAppTopic + '/' + control.hwid + '/' + control.uuid;
      this.Structure.controls[key] = this.processControl(control, name); // Override full object in array
    });

    Object.keys(obj.categories).forEach( key => {
      let category = obj.categories[key];
      this.Structure.categories[key] = category; // Override full object in array
    });

    Object.keys(obj.rooms).forEach( key => {
      let room = obj.rooms[key];
      this.Structure.rooms[key] = room; // Override full object in array
    });

    this.controlsSubject.next(Object.values(this.Structure.controls));
    this.categoriesSubject.next(Object.values(this.Structure.categories));
    this.roomsSubject.next(Object.values(this.Structure.rooms));
    this.registerTopics();
  }

  private registerTopics() {
    MqttTopics.forEach( (element) => {
      let full_topic_name = this.loxberryMqttAppTopic + '/+/+' + element;
      if (this.registered_topics.includes(full_topic_name)) {
        console.log("topic already exists and ignored:", full_topic_name );
        return;
      }
      console.log("register topic name:", full_topic_name );
      this.registered_topics.push(full_topic_name);
      this.MqttSubscription.push( this.mqttService.observe(full_topic_name)
      .subscribe((message: IMqttMessage) => {
        //console.log('MQTT received: ', message.topic, message.payload.toString());
        this.processTopic(message.topic, message.payload );
      }));
    });

    this.mqtt_topic_list.forEach( (topic) => {
      let topic_name = topic + "/#";
      console.log("register topic name:", topic_name );
      this.MqttSubscription.push( this.mqttService.observe(topic_name)
        .subscribe((message: IMqttMessage) => {
        //console.log('MQTT received: ', message.topic, message.payload.toString());
        this.processTopic(this.mqtt_lox2app[message.topic], message.payload);
      }));
    });
  }

  private processTopic(topic_in: any, value_in: any) {
    if (!topic_in) return;
    let topic = topic_in.replace(this.loxberryMqttAppTopic + '/', '');
    let topic_level = topic.split('/');
    let value = value_in.toString();
    let id = topic_level[0] + '/' + topic_level[1];
    //console.log('process topic:', topic_in, value);

    if (this.Structure.controls[id]) {
      this.updateTopic(this.Structure.controls[id], id, topic, value);
      this.controlsSubject.next(Object.values(this.Structure.controls));
    }

    if (this.Structure.categories[id]) {
      this.updateTopic(this.Structure.categories[id], id, topic, value);
      this.controlsSubject.next(Object.values(this.Structure.categories));
    }
    if (this.Structure.rooms[id]) {
      this.updateTopic(this.Structure.rooms[id], id, topic, value);
      this.controlsSubject.next(Object.values(this.Structure.rooms)); // updates for Subscribers
    }
  }


  private updateTopic(obj, name, topic, value) {
    Object.keys(obj).forEach(key => {
      if (name + '/' + key === topic) {
          if (this.isValidJSONObject(value)) {
            obj[key] = JSON.parse(value);
            //console.log('update key/value (json):', name + '/' + key, value);
          }
          else {
            obj[key] = value;
            //console.log('update key/value:', name + '/' + key, value);
          }
          return;
       }
       else
          if (typeof obj[key] === 'object' && obj[key] !== null)
             this.updateTopic(obj[key], name + '/' + key, topic, value);
    });
  }

  private isValidJSONObject(str: string) {
    let obj;
    try {
      obj = JSON.parse(str);
    } catch (e) {
        return false;
    }
    if (typeof obj === 'object') return true;
    else false;
  }

  public unload() : void {
    console.log('unsubscribe topics..');
    this.MqttSubscription.forEach( (item) => { item.unsubscribe(); } );
  }

  public sendMessage(obj: any, value: string) {
    let topic = obj.mqtt_cmd;

    if (!topic) {
      console.log('Topic ' + topic + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic, value);
    console.log('MQTT publish:', obj.name, topic, value);
  }

}
