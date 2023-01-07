import { Observable, BehaviorSubject,  } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from "rxjs/operators";

export abstract class Store<T> {
  private _state: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
  }

  /**
   * get observable of state in store
   */
  get state$(): Observable<T> {
    return this._state.asObservable();
  }

  /**
   * get snapshot of state in store
   */
  get state(): T {
    return this._state.getValue();
  }

  /**
   * selector
   */
  select$<K>(selector: (state: T) => K): Observable<K> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

 /**
   * method to update state in store
   */
  setState<K extends keyof T, E extends Partial<Pick<T, K>>>(fn: (state: T) => E): void {
    const state = fn(this.state);
    this._state.next({ ...this.state, ...state });
  }

}