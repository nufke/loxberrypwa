import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, MqttConnectionState } from 'ngx-mqtt';
import { TranslateService } from '@ngx-translate/core';
import { Control, Subcontrol, Settings } from '../interfaces/data.model'
import { MqttTopics } from '../interfaces/mqtt.api'
import { StorageService } from './storage.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoxBerryService {

  private mqttSubscription: Subscription[] = [];
  private mqttTopicMapping: any = {};
  private mqttPrefixList: string[] = [];
  private registeredTopics: string[] = [];

  private loxberryMqttConnected: boolean = false;
  private loxberryMqttAppTopic: string = '';

  constructor(
    private mqttService: MqttService,
    public translate: TranslateService,
    private dataService: DataService)
  {
    this.initService();

    this.mqttService.state.subscribe((s: MqttConnectionState) => {
      let connectionStatus: boolean = (s === MqttConnectionState.CONNECTED);
      const status = connectionStatus ? 'connected' : 'disconnected';
      //this.loxberryMqttConnected = connectionStatus;
      console.log('LoxBerry Mqtt client connection status: ', status);
  });
  }

  private initService() {
    this.dataService.getSettingsFromStore$().subscribe( settings => {
      // only connect if all mqtt configuration options are valid
      if (settings
          && !this.loxberryMqttConnected
          && settings.mqtt
          && settings.mqtt.username
          && settings.mqtt.password
          && settings.mqtt.hostname
          && settings.mqtt.port
          && settings.mqtt.topic) {
        this.loxberryMqttAppTopic = settings.mqtt.topic;
        this.connectToMqtt(settings);
        this.registerStructureTopic();
      }
    });
  }

  private connectToMqtt(settings: Settings) {
    console.log('Connecting to LoxBerry Mqtt Broker...');
    this.mqttService.connect(
    {
      username: settings.mqtt.username,
      password: settings.mqtt.password,
      hostname: settings.mqtt.hostname,
      port: settings.mqtt.port,
      protocol: 'wss',
    });
    this.loxberryMqttConnected = true;
  }

  private registerStructureTopic() {
    console.log('register Structure...');
    let topic = this.loxberryMqttAppTopic + '/structure';
    this.mqttSubscription.push( this.mqttService.observe(topic)
      .subscribe((message: IMqttMessage) => {
        let msg = message.payload.toString();
        if (msg.length == 0 )
          this.dataService.flushControlsInStore();
        else
          this.ProcessStructure(JSON.parse(msg));
    }));
  }

  private processControl(control: Control, name: string) {
    Object.keys(control).forEach(key => {
       if (typeof control[key] === 'object' && control[key] !== null) {
         this.processControl(control[key], name + '/' + key);
         if (control[key].mqtt) control[key] = ""; // remove mqtt object
       }
       else {
         if (key === 'mqtt') {
            // console.log('element name, value:', name,  control[key] );
            this.mqttTopicMapping[control[key]] = name;
            this.registerTopicPrefix(control[key]);
         }
       }
    });
    return control;
  }

  private registerTopicPrefix(value: string) {
    let prefix = value.split('/')[0];
    if (!this.mqttPrefixList.find( item => { return item === prefix })) {
      this.mqttPrefixList.push(prefix);
      console.log('registered topic prefix:', prefix);
    }
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
    MqttTopics.forEach( topicName => {
      let fullTopicName = this.loxberryMqttAppTopic + '/+/+' + topicName;
      if (this.registeredTopics.includes(fullTopicName)) {
        console.log("Topic already exists and ignored:", fullTopicName );
        return;
      }
      //console.log("register topic name:", fullTopicName );
      this.registeredTopics.push(fullTopicName);
      this.mqttSubscription.push( this.mqttService.observe(fullTopicName)
      .subscribe((message: IMqttMessage) => {
        //console.log('MQTT received: ', message.topic, message.payload.toString());
        this.processTopic(message.topic, message.payload.toString() );
      }));
    });

    this.mqttPrefixList.forEach( prefix => {
      let topicName = prefix + "/#";
      //console.log("register topic prefix:", topicName );
      this.mqttSubscription.push( this.mqttService.observe(topicName)
        .subscribe((message: IMqttMessage) => {
        //console.log('MQTT received: ', message.topic, message.payload.toString());
        this.processTopic(this.mqttTopicMapping[message.topic], message.payload.toString());
      }));
    });
  }

  private processTopic(topic: string, message: string) {
    if (!topic) return;
    let topicName = topic.replace(this.loxberryMqttAppTopic + '/', '');
    //console.log('process topic:', topic, message);
    this.dataService.updateElementInStore(topicName, message);
  }

  unload() : void {
    console.log('unsubscribe topics..');
    this.mqttSubscription.forEach( (item) => { item.unsubscribe(); } );
  }

  sendMessage(obj: Control | Subcontrol, value: string) {
    let topic = obj.mqtt_cmd;

    if (!topic) {
      console.log('Topic ' + topic + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic, value);
    console.log('MQTT publish:', obj.name, topic, value);
  }

}
