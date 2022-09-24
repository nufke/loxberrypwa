import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Settings } from '../interfaces/settings'

export const SETTINGS_TOKEN_KEY = 'lxb-settings-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  private settings: Settings;
  private settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(null);

  constructor() {
    // initial values
    this.settings = {
      loxberryMqttIP: null,
      loxberryMqttPort: null,
      loxberryMqttUrl: null,
      loxberryMqttUsername: null,
      loxberryMqttPassw: null,
      loxberryMqttTopicPrefix: null,
      appDarkTheme: null
    }
    // load settings from Storage
    this.loadSettings();
  }

  async update(obj: Settings) {
    for (const [key, value] of Object.entries(obj)) {
      this.settings[key] = value;
    }
    if (this.settings.loxberryMqttIP)
      await this.updateLoxBerryUrlandIP(this.settings);
  }

  async loadSettings() {
    const settings = await Storage.get({ key: SETTINGS_TOKEN_KEY });
    if (settings.value)
    {
      await this.update(JSON.parse(settings.value));
      this.settingsSubject.next(this.settings);
    }
  }
  
  async store(obj: Settings) : Promise<any> {
    await this.update(obj);
    console.log("store:", this.settings);
    this.settingsSubject.next(this.settings);
    return Storage.set({ key: SETTINGS_TOKEN_KEY, value: JSON.stringify(this.settings) });
  }

  public getSettings() : Observable<Settings> {
    return this.settingsSubject.asObservable();
  }

  async updateLoxBerryUrlandIP(obj: Settings) {
    let ipaddress = '';
    let url = '';
    let port = '';
    if (obj.loxberryMqttIP.includes("http://")) {    // check if user added prefix
      url = obj.loxberryMqttIP;
      ipaddress = obj.loxberryMqttIP.replace('http://','');     // remove http from IP    
    }
    else {
      url = 'http://' + obj.loxberryMqttIP;
      ipaddress = obj.loxberryMqttIP;
    }

    if (ipaddress.match(":[0-9]{4,6}")) {   // check if user added port
      port = ipaddress.split(':')[1];
      ipaddress = ipaddress.split(':')[0]; // remove port from IP  
    }
    else {
      url = url + ':' + obj.loxberryMqttPort; // TODO make configurable
      port = obj.loxberryMqttPort;
    }

    this.settings.loxberryMqttIP = ipaddress;
    this.settings.loxberryMqttUrl = url;
    this.settings.loxberryMqttPort = port;
  }

}
