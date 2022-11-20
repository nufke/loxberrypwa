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

  private subcontrols: Control[] = [];

  private Structure: any = {};

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
    this.Structure.controls = [];
    this.Structure.categories = [];
    this.Structure.rooms = [];

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
          this.registerStructureTopic();
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
    return data.findIndex( item => { return (item.hwid === hwid) && (item.uuid === uuid) });
  }

  private registerStructureTopic() {
    let topic = this.registered_topic_prefix+'/structure';
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
    this.Structure.controls = [];
    //this.subcontrols = [];
    this.Structure.categories = [];
    this.Structure.rooms = [];

    this.controlsSubject.next(this.Structure.controls);
    this.categoriesSubject.next(this.Structure.categories);
    this.roomsSubject.next(this.Structure.rooms);
  }

  private checkControl(obj: Control) : Control {
    let control: Control = obj;
    if (!control.icon.color) control.icon.color = "";
    if (!control.is_favorite) control.is_favorite = false;
    if (!control.is_visible) control.is_visible = true;
    if (!control.is_protected) control.is_protected = false;
    if (!control.order) control.order = 10;
    if (!control.display) control.display = {};
    if (!control.display.text) control.display.text = "";
    if (!control.display.color) control.display.color = null;
    if (!control.display.toggle) control.display.toggle = false;
    return control;
  }

  private checkRoom(obj: Room) : Room {
    let room: Room = obj;
    if (!room.icon.color) room.icon.color = "";
    if (!room.is_favorite) room.is_favorite = false;
    if (!room.is_visible) room.is_visible = true;
    if (!room.is_protected) room.is_protected = false;
    if (!room.order) room.order = 10;
    if (!room.image) room.image = "";
    return room;
  }

  private checkCategory(obj: Category) : Category {
    let category: Category = obj;
    if (!category.icon.color) category.icon.color = "";
    if (!category.is_favorite) category.is_favorite = false;
    if (!category.is_visible) category.is_visible = true;
    if (!category.is_protected) category.is_protected = false;
    if (!category.order) category.order = 10;
    if (!category.image) category.image = "";
    return category;
  }

  // TODO: only items will be added, not removed.
  // To remove items, flush the entire dataset first, and add the required items
  private ProcessStructure(obj: any) {
    if (!obj) return;

    obj.controls.forEach( item => {
      let idx = this.findIndex(obj.controls, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists, do update
        this.Structure.controls[idx] = this.checkControl(item); // Override full object in array
       }
      else { // New item
        this.Structure.controls.push(this.checkControl(item)); // Add new object to array
      }
      /*
      if (item.subcontrols.length) { // store subcontrols in separate registry
        obj.subcontrols.forEach( subitem => {
          let sub_idx = this.findIndex(obj.subcontrols, subitem.hwid, subitem.uuid);
          if (sub_idx >= 0) { // subcontrol exists, do update
            this.subcontrols[sub_idx] = subitem; // Override full object in array
          }
          else { // New subcontrol
            let subcontrol: Control = subitem;
            this.subcontrols.push(subcontrol); // Add new object to array
          }
        });
      }
      */
    });

    obj.categories.forEach( item => {
      let idx = this.findIndex(obj.categories, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists
        this.Structure.categories[idx] = this.checkCategory(item); // Override full object in array
       }
      else { // New item
        this.Structure.categories.push(this.checkCategory(item)); // Add new object to array
      }
    });

    obj.rooms.forEach( item => {
      let idx = this.findIndex(obj.rooms, item.hwid, item.uuid);
      if (idx >= 0) { // Item exists
        this.Structure.rooms[idx] = this.checkRoom(item); // Override full object in array
       }
      else { // New item
        this.Structure.rooms.push(this.checkRoom(item)); // Add new object to array
      }
    });

    this.controlsSubject.next(this.Structure.controls);
    this.categoriesSubject.next(this.Structure.categories);
    this.roomsSubject.next(this.Structure.rooms);

    this.registerTopics();
  }

  private processTopic(message: any) {
    if (!message) return;

    let topic = message.topic.replace(this.registered_topic_prefix + '/', '').split('/');
    let value = message.payload.toString();
    let hwid = topic[0];
    let uuid = topic[1];

    let idx = this.findIndex(this.Structure.controls, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.Structure.controls[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.Structure.controls[idx][topic[2]] = value;
      console.log('received control: ', message.topic, value);
      this.controlsSubject.next(this.Structure.controls); // updates for Subscribers
    }
/*
    let sub_idx = this.findIndex(this.subcontrols, hwid, uuid);
    if (sub_idx >= 0) {
      if (topic.length == 4) this.controls[idx].subcontrols[sub_idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.controls[idx].subcontrols[sub_idx][topic[2]] = value;
      console.log('received subcontrol: ', topic.toString(), value);
      this.controlsSubject.next(this.controls); // updates for Subscribers
    }
*/
    idx = this.findIndex(this.Structure.categories, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.Structure.categories[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.Structure.categories[idx][topic[2]] = value;
      console.log('received category: ', topic.toString(), value);
      this.categoriesSubject.next(this.Structure.categories); // updates for Subscribers
    }

    idx = this.findIndex(this.Structure.rooms, hwid, uuid);
    if (idx >= 0) {
      if (topic.length == 4) this.Structure.rooms[idx][topic[2]][topic[3]] = value;
      if (topic.length == 3) this.Structure.rooms[idx][topic[2]] = value;
      console.log('received room: ', topic.toString(), value);
      this.roomsSubject.next(this.Structure.rooms); // updates for Subscribers
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
      this.MqttSubscription.push( this.mqttService.observe(full_topic_name)
      .subscribe((message: IMqttMessage) => {
        this.processTopic(message);
      }));
    });
  }

  public unload() : void {
    console.log('unsubscribe topics..');
    this.MqttSubscription.forEach( (item) => { item.unsubscribe(); } );
  }

  public sendMessage(obj: any, topic: string, value: string, retain_state: any) {
    let idx = this.findIndex(this.Structure.controls, obj.hwid, obj.uuid);
    let topic_root = this.registered_topic_prefix + '/' + obj.hwid + '/' + obj.uuid;

    if (idx==-1) {
      console.log('Topic ' + topic_root + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic_root + topic, value, { qos: 1, retain: retain_state });
    console.log('MQTT publish:', obj.name, topic_root + topic, value);
  }

}
