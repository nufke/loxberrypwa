import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, distinctUntilKeyChanged } from 'rxjs/operators';
import { Control, Subcontrol, Category, Room, Settings, AppState, INITIAL_APP_STATE } from '../interfaces/data.model';
import { Store } from './store';

@Injectable({ providedIn: 'root' })
export class DataService extends Store<AppState> {

  constructor() {
    super(INITIAL_APP_STATE);
  }

  get settings$(): Observable<Settings> {
    return this.select$((state) => state.settings).pipe(
      distinctUntilKeyChanged('mqtt'),
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

  async updateElementInStore(topic, value) {
    let topic_level = topic.split('/');
    let id = topic_level[0] + '/' + topic_level[1];
    this.setState((state) => {

      if (state.controls[id]) {
        this.findAndUpdate1(state.controls[id], id, topic, value);
      }

      if (state.categories[id]) {
        this.findAndUpdate1(state.categories[id], id, topic, value);
      }

      if (state.rooms[id]) {
        this.findAndUpdate1(state.rooms[id], id, topic, value);
      }
      return ({ ...state });
    });
  }

  private findAndUpdate1(obj, name, topic, value) {
    Object.keys(obj).forEach(key => {
      if (name + '/' + key === topic) {
        obj[key] = this.isValidJSONObject(value) ? JSON.parse(value) : value;
        //console.log('update topic', topic, obj[key] );
        return;
      }
      else
        if (typeof obj[key] === 'object' && obj[key] !== null)
          this.findAndUpdate1(obj[key], name + '/' + key, topic, value);
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