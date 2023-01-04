import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Control, Subcontrol, Category, Room } from '../interfaces/data.model';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class DataService {

  constructor(public store: AppStore) {
  }

  getControlsFromStore(): Observable<Control[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.controls))));
  }

  getCategoriesFromStore(): Observable<Category[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.categories))));
  }

  getRoomsFromStore(): Observable<Room[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.rooms))));
  }

  getSingleControlFromStore(hwid: string, uuid: string): Observable<Control> {
    return this.store.state$.pipe(switchMap(state => of(state.controls[hwid + '/' + uuid])));
  }

  getSingleSubcontrolFromStore(hwid: string, uuid: string, subcontrol_uuid: string): Observable<Subcontrol> {
    return this.store.state$.pipe(switchMap(state => of(state.controls[hwid + '/' + uuid].subcontrols[hwid + '/' + subcontrol_uuid])));
  }

  addControlToStore(control: Control): void {
    let state = this.store.getState();
    state.controls[this.getId(control)] = control;
    this.store.setState({ ...state });
  }

  addCategoryToStore(category: Category): void {
    let state = this.store.getState();
    state.categories[this.getId(category)] = category;
    this.store.setState({ ...state });
  }

  addRoomToStore(room: Room): void {
    let state = this.store.getState();
    state.rooms[this.getId(room)] = room;
    this.store.setState({ ...state });
  }

  flushControlsInStore(): void {
    let state = this.store.getState();
    state.controls = {};
    state.categories = {};
    state.rooms = {};
    this.store.setState({ ...state });
  }

  updateElementInStore(topic, value) {
    let state = this.store.getState();
    let topic_level = topic.split('/');
    let id = topic_level[0] + '/' + topic_level[1];

    if (state.controls[id])
      this.findAndUpdate(state.controls[id], id, topic, value);
    if (state.categories[id])
      this.findAndUpdate(state.categories[id], id, topic, value);
    if (state.rooms[id])
      this.findAndUpdate(state.rooms[id], id, topic, value);
    this.store.setState({ ...state });
  }

  private findAndUpdate(obj, name, topic, value) {
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
          this.findAndUpdate(obj[key], name + '/' + key, topic, value);
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