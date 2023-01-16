import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Control, Subcontrol, Category, Room, Settings, AppState, INITIAL_APP_STATE } from '../interfaces/data.model';
import { Store } from './store';

@Injectable({ providedIn: 'root' })
export class DataService extends Store<AppState> {

  constructor() {
    super(INITIAL_APP_STATE);
  }

  getControlsFromStore$(): Observable<Control[]> {
    return this.select$((state) => Object.values(state.controls)).pipe(
      shareReplay()
    );
  }

  getCategoriesFromStore$(): Observable<Category[]> {
    return this.select$((state) => Object.values(state.categories)).pipe(
      shareReplay()
    );
  }

  getRoomsFromStore$(): Observable<Room[]> {
    return this.select$((state) => Object.values(state.rooms)).pipe(
      shareReplay()
    );
  }

  getSingleControlFromStore$(hwid: string, uuid: string): Observable<Control> {
    return this.select$((state) => state.controls[hwid + '/' + uuid]).pipe(
      shareReplay()
    );
  }

  getSingleSubcontrolFromStore$(hwid: string, uuid: string, subcontrol_uuid: string): Observable<Subcontrol> {
    return this.select$((state) =>
      state.controls[hwid + '/' + uuid].subcontrols[hwid + '/' + subcontrol_uuid]).pipe(
        shareReplay()
      );
  }

  getSettingsFromStore$(): Observable<Settings> {
    return this.select$((state) => state.settings).pipe(
      shareReplay()
    );
  }

  getCurrentSettingsFromStore(): Settings {
    return this.state.settings;
  }

  putSettingsInStore(settings: Settings) {
    this.setState({
      settings: settings}
    );
  }

  addControlToStore(control: Control): void {
    this.setState((state) => {
      state.controls[this.getId(control)] = control;
      return ({ ...state })
    });
  }

  addCategoryToStore(category: Category): void {
    this.setState((state) => {
      state.categories[this.getId(category)] = category;
      return ({ ...state });
    });
  }

  addRoomToStore(room: Room): void {
    this.setState((state) => {
      state.rooms[this.getId(room)] = room;
      return ({ ...state });
    });
  }

  flushControlsInStore(): void {
    this.setState({
      controls: {},
      categories: {},
      rooms: {},
    });
  }

  updateElementInStore(topic, value) {
    let topic_level = topic.split('/');
    let id = topic_level[0] + '/' + topic_level[1];

    this.setState((state) => {
      if (state.controls[id]) {
        this.findAndUpdate(state.controls[id], id, topic, value);
      }
      if (state.categories[id]) {
        this.findAndUpdate(state.categories[id], id, topic, value);
      }
      if (state.rooms[id]) {
        this.findAndUpdate(state.rooms[id], id, topic, value);
      }
      return ({ ...this.state });
    });
  }

  private async findAndUpdate(obj, name, topic, value) {
    Object.keys(obj).forEach(key => {
      if (name + '/' + key === topic) {
        if (this.isValidJSONObject(value)) {
          obj[key] = JSON.parse(value);
          //console.log('update key/value (json):', name + '/' + key, JSON.parse(value));
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