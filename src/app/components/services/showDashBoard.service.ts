import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ShowDashBoardService {

    private myBooleanSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public myBoolean$: Observable<boolean> = this.myBooleanSubject.asObservable();
  
    constructor() { }
  
    public setBoolean(value: boolean): void {
      this.myBooleanSubject.next(value);
    }

    public getBoolean(): boolean {
        return this.myBooleanSubject.getValue();
      }
  
}
