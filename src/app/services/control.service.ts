import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Control, Subcontrol, Category, Room } from '../interfaces/datamodel';
import { LoxBerryService } from '../services/loxberry.service';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class ControlService {

  constructor(public store: AppStore,
    public loxberryService: LoxBerryService) {
  }

  get controls$(): Observable<Control[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.controls))));
  }

  get categories$(): Observable<Category[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.categories))));
  }

  get rooms$(): Observable<Room[]> {
    return this.store.state$.pipe(switchMap(state => of(Object.values(state.rooms))));
  }

  getControl(hwid: string, uuid: string): Observable<Control> {
    return this.store.state$.pipe(switchMap(state => of(state.controls[hwid + '/' + uuid])));
  }

  getSubcontrol(hwid: string, uuid: string, subcontrol_uuid: string): Observable<Subcontrol> {
    return this.store.state$.pipe(switchMap(state => of(state.controls[hwid + '/' + uuid].subcontrols[hwid + '/' + subcontrol_uuid])));
  }

  updateControl(control: Control | Subcontrol, msg: string): void {
    this.loxberryService.sendMessage(control, msg);
  }

}