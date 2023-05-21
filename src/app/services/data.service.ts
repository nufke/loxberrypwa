import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, distinctUntilKeyChanged } from 'rxjs/operators';
import { Control, Category, Room, Settings, AppState, INITIAL_APP_STATE } from '../interfaces/data.model';
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
      settings: settings
    });
  }

  flushControlsInStore(): void {
    this.setState({
      structure: {
        controls: {},
        categories: {},
        rooms: {}
      }
    });
  }

  updateStructureInStore(obj: any) {
    this.setState((state) => {

      Object.keys(obj.controls).forEach(key => {
        let control = obj.controls[key];
        state.structure.controls[this.getId(control)] = control;
      });

      Object.keys(obj.categories).forEach(key => {
        let category = obj.categories[key];
        state.structure.categories[this.getId(category)] = category;
      });

      Object.keys(obj.rooms).forEach(key => {
        let room = obj.rooms[key];
        state.structure.rooms[this.getId(room)] = room;
      });

      return ({ ...state })
    });
  }

  updateElementsInStore(mqttMessage: any) {
    //if (mqttMessage.length > 0) console.log('updateElementInStore', mqttMessage);
    this.setState((state) => {
      mqttMessage.forEach(message => {
        if (!message.topic) return;
        let topics = message.topic.split('/');
        let value = message.payload.toString();
        console.log('updateElementInStore', message.topic, value);
        let id = topics[0] + '/' + topics[1];

        if (state.structure.controls[id]) {
          this.stateUpdate(state.structure.controls[id], id, message.topic, value);
        }

        if (state.structure.categories[id]) {
          this.stateUpdate(state.structure.categories[id], id, message.topic, value);
        }

        if (state.structure.rooms[id]) {
          this.stateUpdate(state.structure.rooms[id], id, message.topic, value);
        }
      });
      return ({ ...state });
    });
  }

  private stateUpdate(obj, name, topic, value) {
    Object.keys(obj).forEach(key => {
      //console.log('check topic ', name + '/' + key);
      if (name + '/' + key === topic) {
        obj[key] = this.isValidJSONObject(value) ? JSON.parse(value) : value;
        //console.log('update topic ', topic, obj[key], value );
        return;
      }
      else
        if (typeof obj[key] === 'object' && obj[key] !== null)
          this.stateUpdate(obj[key], name + '/' + key, topic, value);
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
    return obj.serialNr + '/' + obj.uuid;
  }

}