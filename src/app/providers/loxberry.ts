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
          this.registerTopic(this.registered_topic_prefix+'/structure');
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
       }
      else { // New item
        var control: Control;
        control = item;
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

    this.registerTopics();
  }

  private processTopic(message: any) {
    if (!message) return;

    let topic = message.topic.replace(this.registered_topic_prefix + '/', '').split('/');
    let value = message.payload.toString();
    let hwid = topic[0];
    let uuid = topic[1];

    let idx = this.findIndex(this.controls, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.controls[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.controls[idx][topic[2]] = value;
      console.log('received control: ', topic.toString(), value);
      this.controlsSubject.next(this.controls); // updates for Subscribers
    }

    idx = this.findIndex(this.categories, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.categories[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.categories[idx][topic[2]] = value;
      console.log('received category: ', topic.toString(), value);
      this.categoriesSubject.next(this.categories); // updates for Subscribers
    }

    idx = this.findIndex(this.rooms, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.rooms[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.rooms[idx][topic[2]] = value;
      console.log('received room: ', topic.toString(), value);
      this.roomsSubject.next(this.rooms); // updates for Subscribers
    }
  }

  private registerTopics() {
    MqttTopics.forEach( (element) => {
      let full_topic_name = this.registered_topic_prefix + '/+/+' + element; // note: two wildcards '+' included
      if (this.registered_topics.includes(full_topic_name)) {
        console.log("topic already exists and ignored:", full_topic_name );
        return;
      }
      console.log("register topic name:", full_topic_name );
      this.registered_topics.push(full_topic_name);
      this.subscription.push( this.mqttService.observe(full_topic_name)
      .subscribe((message: IMqttMessage) => {
        this.processTopic(message);
      }));
    });
  }

  public unload() : void {
    console.log('unsubscribe topics..');
    this.subscription.forEach( (item) => { item.unsubscribe(); } );
  }

  public sendMessage(obj: any, topic: string, value: string, retain_state: any) {
    let idx = this.findIndex(this.controls, obj.hwid, obj.uuid);
    let topic_root = this.registered_topic_prefix + '/' + obj.hwid + '/' + obj.uuid;

    if (idx==-1) {
      console.log('Topic ' + topic_root + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic_root + topic, value, { qos: 1, retain: retain_state });
    console.log('MQTT publish:', obj.name, topic_root + topic, value);
  }

}
