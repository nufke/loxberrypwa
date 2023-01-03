import { Observable, of } from 'rxjs';
import { map, switchMap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Control, Category, Room, AppState, INITIAL_APP_STATE } from '../interfaces/datamodel';
import { Store } from './store';

@Injectable({providedIn: 'root'})
export class AppStore extends Store<AppState> {

    constructor() {
    super(INITIAL_APP_STATE);
  }

  public emptyStore(): void {
    this.setState(INITIAL_APP_STATE);
  }
}