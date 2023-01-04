import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IMqttMessage, MqttService, MqttConnectionState } from 'ngx-mqtt';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Control, Category, Room } from '../interfaces/data.model'
import { MqttTopics } from '../interfaces/mqtt.api'
import { StorageService } from './storage.service';
import { DataService } from './data.service';

var sprintf = require('sprintf-js').sprintf;

@Injectable({
  providedIn: 'root'
})
export class LoxBerryService {

  private MqttSubscription: Subscription[] = [];

  private mqtt_lox2app: any = {};
  private mqtt_topic_list: string[] = [];

  private registered_topics: string[] = [];

  private loxberryMqttIP: string = '';
  private loxberryMqttPort: string = '';
  private loxberryMqttUsername: string = '';
  private loxberryMqttPassw: string = '';
  private loxberryMqttConnected: boolean = false;
  private loxberryMqttAppTopic: string = '';

  constructor(
    private mqttService: MqttService,
    public translate: TranslateService,
    private storageService: StorageService,
    private dataService: DataService)
  {
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
          this.dataService.flushControlsInStore();
        else
          this.ProcessStructure(JSON.parse(msg));
    }));
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

  private registerTopic(value: string) {
    let prefix = value.split('/')[0];
    if (!this.mqtt_topic_list.find( item => { return item === prefix }))
        this.mqtt_topic_list.push(prefix);
  }

  // TODO: only items will be added, not removed
  private ProcessStructure(obj: any) {
    if (!obj) return;

    Object.keys(obj.controls).forEach( key => {
      let control = obj.controls[key];
      let name = this.loxberryMqttAppTopic + '/' + control.hwid + '/' + control.uuid;
      this.dataService.addControlToStore(this.processControl(control, name)); // Override full object in array
    });

    Object.keys(obj.categories).forEach( key => {
      let category = obj.categories[key];
      this.dataService.addCategoryToStore(category); // Override full object in array
    });

    Object.keys(obj.rooms).forEach( key => {
      let room = obj.rooms[key];
      this.dataService.addRoomToStore(room); // Override full object in array
    });

    this.registerTopics();
  }

  private registerTopics() {
    MqttTopics.forEach( (element) => {
      let full_topic_name = this.loxberryMqttAppTopic + '/+/+' + element;
      if (this.registered_topics.includes(full_topic_name)) {
        //console.log("topic already exists and ignored:", full_topic_name );
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
    let value = value_in.toString();
    //console.log('process topic:', topic_in, value);
    this.dataService.updateElementInStore(topic, value);
  }

  unload() : void {
    console.log('unsubscribe topics..');
    this.MqttSubscription.forEach( (item) => { item.unsubscribe(); } );
  }

  sendMessage(obj: any, value: string) {
    let topic = obj.mqtt_cmd;

    if (!topic) {
      console.log('Topic ' + topic + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic, value);
    console.log('MQTT publish:', obj.name, topic, value);
  }

}
