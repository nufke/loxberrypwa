import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IMqttMessage, MqttService, MqttConnectionState } from 'ngx-mqtt';
import { util } from 'node-forge' // TODO check package
import { Control, Category, Room } from '../interfaces/datamodel'
import { MqttControlTopics, MqttCategoryTopics, MqttRoomTopics } from '../interfaces/mqtt.api'
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoxBerry {

  private subscription: Subscription[] = [];
  private controls: Control[] = [];
  private controlsSubject: BehaviorSubject<Control[]> = new BehaviorSubject([]);
  private categories: Category[] = [];
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  private rooms: Room[] = [];
  private roomsSubject: BehaviorSubject<Room[]> = new BehaviorSubject([]);

  private registered_topics: string[] = [];

  private loxberryMqttIP: string = '';
  private loxberryMqttPort: string = '';
  private loxberryMqttUsername: string = '';
  private loxberryMqttPassw: string = '';
  private loxberryMqttConnected: boolean = false;

  // TODO move to app configuration
  private registered_topic_prefix = 'loxberry/app';

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
    this.storageService.getSettings().subscribe( settings => {
      if (settings) {
        this.loxberryMqttIP = settings.loxberryMqttIP;
        this.loxberryMqttPort = settings.loxberryMqttPort;
        this.loxberryMqttUsername = settings.loxberryMqttUsername;
        this.loxberryMqttPassw = settings.loxberryMqttPassw;

        // only connect if all configuration options are valid
        if (!this.loxberryMqttConnected
             && this.loxberryMqttUsername
             && this.loxberryMqttPassw
             && this.loxberryMqttIP
             && this.loxberryMqttPort) {
          this.connectToMqtt();
          this.registerTopic(this.registered_topic_prefix+'/settings/set');
        }
      }
    });

    this.mqttService.state.subscribe((s: MqttConnectionState) => {
      const status = s === MqttConnectionState.CONNECTED ? 'connected' : 'disconnected';
      console.log('LoxBerry Mqtt client connection status: ', status);
  });
  }

  private connectToMqtt()
  {
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

  private findIndex(data: any, hwid: string, uuid: string) {
    for(let i = 0; i < data.length; i++) { // loop through array index (1st level only)
      if (data[i])
        if ((data[i].uuid == uuid) && (data[i].hwid == hwid)) return i;
    }
    return -1; // uuid not found
  }

  private registerTopic(topic: string) {
    console.log('Register to topic: ', topic);
    this.subscription.push( this.mqttService.observe(topic)
      .subscribe((message: IMqttMessage) => {
        let mqtt_topic = message.topic.substring(0, message.topic.length - 5); // trim last characters from string
        let msg = message.payload.toString();
        if (msg.length == 0 )
          this.flushData();
        else
          this.ProcessJSON(JSON.parse(msg));
    }));
  }

  private flushData() {
    console.log("flush structure...");
    this.controls = [];
    this.categories = [];
    this.rooms = [];

    this.controlsSubject.next(this.controls);
    this.categoriesSubject.next(this.categories);
    this.roomsSubject.next(this.rooms);
  }

  // TODO: only items will be added, not removed.
  // To remove items, flush the entire dataset first, and add the required items
  private ProcessJSON(obj: any) {
    if (!obj) return;

    obj.controls.forEach( item => {
      let idx = this.findIndex(obj.controls, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists, do update
        this.controls[idx] = item; // Override full object in array
        this.controls[idx].state._status_text = util.format(item.state.format, item.state.value);
       }
      else { // New item
        let control = item;
        control.state._status_text = util.format(item.state.format, item.state.value);
        this.controls.push(control); // Add new object to array
      }
    });

    obj.categories.forEach( item => {
      let idx = this.findIndex(obj.categories, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists
        this.categories[idx] = item; // Override full object in array
       }
      else { // New item
        this.categories.push(item); // Add new object to array
      }
    });

    obj.rooms.forEach( item => {
      let idx = this.findIndex(obj.rooms, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists
        this.rooms[idx] = item; // Override full object in array
       }
      else { // New item
        this.rooms.push(item); // Add new object to array
      }
    });

    this.controlsSubject.next(this.controls);
    this.categoriesSubject.next(this.categories);
    this.roomsSubject.next(this.rooms);

    this.registerSubTopics(this.controls, this.controlsSubject, 'control', MqttControlTopics);
    this.registerSubTopics(this.categories, this.categoriesSubject, 'category', MqttCategoryTopics);
    this.registerSubTopics(this.rooms, this.roomsSubject, 'room', MqttRoomTopics);
  }

  private expandTopics(obj: any): Array<string> {
    const result = [];
    for (const prop in obj) {
      const value = obj[prop];
      if (typeof value === 'object')
        this.expandTopics(value).forEach( item => result.push(item) );
      else
        result.push(value);
    }
    return result;
  }

  private registerSubTopics(data: any, subject: any, domain_topic: string, topics: any) {
    this.expandTopics(topics).forEach( (element) => {
      let full_topic_name = this.registered_topic_prefix + '/+/+' + element; // note: two whildcards '+' included
      if (this.registered_topics.includes(full_topic_name)) {
        console.log("topic already exists and ignored:", full_topic_name );
        return;
      }
      console.log("register topic name:", full_topic_name );
      this.registered_topics.push(full_topic_name);
      this.subscription.push( this.mqttService.observe(full_topic_name)
      .subscribe((message: IMqttMessage) => {
        let topic_received = message.topic.replace(this.registered_topic_prefix + '/', '').split('/');
        let msg = message.payload.toString();
        let idx = this.findIndex(data, topic_received[0], topic_received[1]); // 0=hwid, 1=uuid
        // extract name of fields from MQTT topic name
        if ((topic_received.length == 4) && (idx != -1)) {
          data[idx][topic_received[2]][topic_received[3]] = msg;
          console.log('received_4: ', this.registered_topic_prefix + '/' + topic_received[0] + '/' + topic_received[1] + '/' + topic_received[2] + '/' + topic_received[3], msg);
        }
        else if (idx != -1) {
          data[idx][topic_received[2]] = msg;
          console.log('received: ', this.registered_topic_prefix + '/' + topic_received[0] + '/' + topic_received[1] + '/' + topic_received[2], msg);
        }
        subject.next(data); // updates for Subscribers
      }));
    });
  }

  public unload() : void {
    console.log('unsubscribe topics..');
    this.subscription.forEach( (item) => { item.unsubscribe(); } );
  }

  public sendMessage(type: string, obj: any, retain_state: any) {
    let idx = this.findIndex(this.controls, obj.hwid, obj.uuid);
    let topic_root = this.registered_topic_prefix + '/' + obj.hwid + '/' + obj.uuid;

    if (idx==-1) {
      console.log('Topic ' + topic_root + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic_root + '/state/value', obj.state.value, { qos: retain_state, retain: true });
    console.log('MQTT publish:', topic_root + '/state/value', obj.state.value);
  }

}
