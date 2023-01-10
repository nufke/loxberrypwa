import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Control, Subcontrol, Category, Room } from '../interfaces/data.model';
import { DataService } from './data.service';
import { LoxBerryService } from '../services/loxberry.service';

@Injectable({ providedIn: 'root' })
export class ControlService {

  constructor(private dataService: DataService,
    public loxberryService: LoxBerryService) {
  }

  get controls$(): Observable<Control[]> {
    return this.dataService.getControlsFromStore$();
  }

  get categories$(): Observable<Category[]> {
    return this.dataService.getCategoriesFromStore$();
  }

  get rooms$(): Observable<Room[]> {
    return this.dataService.getRoomsFromStore$();
  }

  getControl$(hwid: string, uuid: string): Observable<Control> {
    return this.dataService.getSingleControlFromStore$(hwid, uuid);
  }

  getSubcontrol$(hwid: string, uuid: string, subcontrol_uuid: string): Observable<Subcontrol> {
    return this.dataService.getSingleSubcontrolFromStore$(hwid, uuid, subcontrol_uuid);
  }

  updateControl(control: Control | Subcontrol, msg: string): void {
    this.loxberryService.sendMessage(control, msg);
  }

}