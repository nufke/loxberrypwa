import { Injectable } from '@angular/core';
import { AppState, INITIAL_APP_STATE } from '../interfaces/data.model';
import { Store } from './store';

@Injectable({providedIn: 'root'})
export class AppStore extends Store<AppState> {

    constructor() {
    super(INITIAL_APP_STATE);
  }

  public emptyStore(): void {
    this.setState((state) => { return state = INITIAL_APP_STATE; });
  }
}