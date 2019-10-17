import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAppsService {

  constructor() { }

  private messageSource = new BehaviorSubject('default message');

  currentMessage = this.messageSource.asObservable();

  addApp(id) {
    // API CAll to add this into array.
    this.messageSource.next(id)
  }

}
