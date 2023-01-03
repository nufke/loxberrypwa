import { Injectable } from '@angular/core';
import { Control, Subcontrol, Category, Room } from '../interfaces/datamodel';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(public store: AppStore) {
  }

  addControl(control: Control): void {
    let state = this.store.getState();
    state.controls[this.getId(control)] = control;
    this.store.setState({ ...state });
  }

  addCategory(category: Category): void {
    let state = this.store.getState();
    state.categories[this.getId(category)] = category;
    this.store.setState({ ...state });
  }

  addRoom(room: Room): void {
    let state = this.store.getState();
    state.rooms[this.getId(room)] = room;
    this.store.setState({ ...state });
  }

  flushControls(): void {
    let state = this.store.getState();
    state.controls = {};
    state.categories = {};
    state.rooms = {};
    this.store.setState({ ...state });
  }

  updateElement(topic, value) {
    let state = this.store.getState();
    let topic_level = topic.split('/');
    let id = topic_level[0] + '/' + topic_level[1];

    if (state.controls[id])
      this.updateElementR(state.controls[id], id, topic, value);
    if (state.categories[id])
      this.updateElementR(state.categories[id], id, topic, value);
    if (state.rooms[id])
      this.updateElementR(state.rooms[id], id, topic, value);
    this.store.setState({ ...state });
  }

  private updateElementR(obj, name, topic, value) {
    Object.keys(obj).forEach(key => {
      if (name + '/' + key === topic) {
        if (this.isValidJSONObject(value)) {
          obj[key] = JSON.parse(value);
          //console.log('update key/value (json):', name + '/' + key, obj[key]);
        }
        else {
          obj[key] = value;
          //console.log('update key/value:', name + '/' + key, value);
        }
      }
      else
        if (typeof obj[key] === 'object' && obj[key] !== null)
          this.updateElementR(obj[key], name + '/' + key, topic, value);
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

  private getId(obj: Control | Category | Room): string {
    return obj.hwid + '/' + obj.uuid;
  }

}