import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, } from 'rxjs';
import { tap, map, filter, buffer, debounceTime } from "rxjs/operators";
import { IMqttMessage, MqttService, MqttConnectionState } from 'ngx-mqtt';
import { TranslateService } from '@ngx-translate/core';
import { Control, Subcontrol, Settings } from '../interfaces/data.model'
import { MqttTopics } from '../interfaces/mqtt.api'
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoxBerryService
  implements OnDestroy {

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
      this.loxberryMqttConnected = (s === MqttConnectionState.CONNECTED);
      const status = this.loxberryMqttConnected ? 'connected' : 'disconnected';
      console.log('LoxBerry Mqtt client connection status:', status);

      if (this.loxberryMqttConnected && (!this.mqttSubscription[0]))
        this.registerStructureTopic();

      if (!this.loxberryMqttConnected) /* disconnected, so unsubscribe and clean local cache */
        this.unregisterTopics();
    });
  }

  private initService() {
    this.dataService.settings$.subscribe( settings => {
      // only connect if all mqtt configuration options are valid
      if (settings
          && settings.mqtt
          && settings.mqtt.username
          && settings.mqtt.password
          && settings.mqtt.hostname
          && settings.mqtt.port
          && settings.mqtt.topic) {
        this.loxberryMqttAppTopic = settings.mqtt.topic;
        this.connectToMqtt(settings);
      }
    });
  }

  private connectToMqtt(settings: Settings) {
    console.log('Connecting to LoxBerry MQTT Broker...');
    this.mqttService.connect(
    {
      username: settings.mqtt.username,
      password: settings.mqtt.password,
      hostname: settings.mqtt.hostname,
      port: settings.mqtt.port,
      keepalive: 5,          // Keep alive 5s
      connectTimeout: 5000,  // Timeout period 5s
      reconnectPeriod: 5000, // Reconnect period 5s
      protocol: 'wss',
    });
  }

  private registerStructureTopic() {
    console.log('Register Structure...');
    let topic = this.loxberryMqttAppTopic + '/structure';
    this.mqttSubscription[0] = this.mqttService.observe(topic)
      .subscribe((message: IMqttMessage) => {
        let msg = message.payload.toString();
        if (msg.length == 0 )
          this.dataService.flushControlsInStore();
        else
          this.processStructure(JSON.parse(msg));
    });

  }

  // TODO keep mqtt field in structure (do not alter it)
  private processControl(control: Control, name: string) {
    Object.keys(control).forEach(key => {
       if (typeof control[key] === 'object' && control[key] !== null) {
         this.processControl(control[key], name + '/' + key);
         if (control[key].mqtt) control[key] = ""; // remove mqtt object
       }
       else {
         if (key === 'mqtt') {
            this.mqttTopicMapping[control[key]] = name.replace(this.loxberryMqttAppTopic + '/', '');
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
      console.log('Registered topic prefix: ', prefix);
    }
  }

  // TODO: only items will be added, not removed
  private processStructure(obj: any) {
    if (!obj) return;

    Object.keys(obj.controls).forEach(key => {
      let control = obj.controls[key];
      let name = this.loxberryMqttAppTopic + '/' + control.hwid + '/' + control.uuid;
      obj.controls[key] = this.processControl(control, name); // TODO merge with updateStructureInStore
    });

    this.dataService.updateStructureInStore(obj);
    this.registerTopics();
  }

  private registerTopics() {
    MqttTopics.forEach( topicName => {
      let fullTopicName = this.loxberryMqttAppTopic + '/+/+' + topicName;
      if (this.registeredTopics.includes(fullTopicName)) {
        console.log("Topic already exists and ignored:", fullTopicName );
      }
      else {
        console.log("Register topic name:", fullTopicName );
        this.registeredTopics.push(fullTopicName);
        this.mqttSubscription.push( this.mqttService.observe(fullTopicName).pipe(
          filter(items => items.length > 0),
          buffer(this.mqttService.observe(fullTopicName).pipe(debounceTime(10))), /* collect all transactions within 10ms */
        ).subscribe((items: IMqttMessage[]) => {
          //console.log('MQTT received: ', items.topic, items.payload.toString());
          this.dataService.updateElementsInStore(items);
        }));
      }
    });

    this.mqttPrefixList.forEach( prefix => {
      let topicName = prefix + "/#";
      if (this.registeredTopics.includes(topicName)) {
        console.log("Topic already exists and ignored:", topicName );
      }
      else {
        console.log("Register topic name:", topicName );
        this.registeredTopics.push(topicName);
        this.mqttSubscription.push( this.mqttService.observe(topicName).pipe(
          //tap( message => console.log('message', message.topic, message.payload.toString())),
          map( message => ({...message, topic: this.mqttTopicMapping[message.topic]})),
          filter(items => items.length > 0),
          buffer(this.mqttService.observe(topicName).pipe(debounceTime(10))), /* collect all transactions within 10ms */
        ).subscribe((items: IMqttMessage[]) => {
          //console.log('MQTT received: ', items.topic, items.payload.toString());
          this.dataService.updateElementsInStore(items);
        }));
      }
    });
  }

  private unregisterTopics(): void {
    console.log('Unsubscribe from MQTT topics...');
    this.mqttSubscription.forEach( (item) => { item.unsubscribe(); } );
    this.mqttSubscription = []; /* empty Subscriptions */
    this.registeredTopics = []; /* empty registered topics */
    this.mqttTopicMapping = []; /* empty mapping */
  }

  ngOnDestroy(): void {
    this.unregisterTopics();
  }

  sendMessage(obj: Control | Subcontrol, value: string) {
    let topic = obj.mqtt_cmd;

    if (!topic) {
      console.log('Topic ' + topic + ' not found. Nothing published.');
      return;
    }

    this.mqttService.unsafePublish(topic, value);
    console.log('MQTT publish: ', obj.name, topic, value);
  }

}