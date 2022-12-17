import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Settings } from '../interfaces/settings'

export const SETTINGS_TOKEN_KEY = 'lxb-settings-token';
export const encryptStorage = new EncryptStorage('DNGS9SDJ3NFS9F5DNRW8AHSDN3WAQSF');

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
      loxberryMqttAppTopic: null,
      appDarkTheme: null,
      appLanguage: null
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
    let settings = encryptStorage.getItem(SETTINGS_TOKEN_KEY);
    if (settings)
    {
      await this.update(settings);
      this.settingsSubject.next(this.settings);
    }
  }

  async store(obj: Settings) : Promise<any> {
    await this.update(obj);
    this.settingsSubject.next(this.settings);
    return encryptStorage.setItem(SETTINGS_TOKEN_KEY, JSON.stringify(this.settings));
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
