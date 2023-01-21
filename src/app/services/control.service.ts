import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Control, Subcontrol, Category, Room } from '../interfaces/data.model';
import { DataService } from './data.service';
import { LoxBerryService } from '../services/loxberry.service';

@Injectable({ providedIn: 'root' })
export class ControlService {

  constructor(private dataService: DataService,
    public loxberryService: LoxBerryService) {
  }

  get controls$(): Observable<Control[]> {
    return this.dataService.select$((state) => Object.values(state.controls)).pipe(
      shareReplay()
    );
  }

  get categories$(): Observable<Category[]> {
    return this.dataService.select$((state) => Object.values(state.categories)).pipe(
      shareReplay()
    );
  }

  get rooms$(): Observable<Room[]> {
    return this.dataService.select$((state) => Object.values(state.rooms)).pipe(
      shareReplay()
    );
  }

  getControl$(hwid: string, uuid: string): Observable<Control> {
    return this.dataService.select$((state) => state.controls[hwid + '/' + uuid]).pipe(
      shareReplay()
    );
  }

  getSubcontrol$(hwid: string, uuid: string, subcontrol_uuid: string): Observable<Subcontrol> {
    return this.dataService.select$((state) =>
      state.controls[hwid + '/' + uuid].subcontrols[hwid + '/' + subcontrol_uuid]).pipe(
        shareReplay()
      );
  }

  updateControl(control: Control | Subcontrol, msg: string): void {
    this.loxberryService.sendMessage(control, msg);
  }

}