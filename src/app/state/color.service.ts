import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorCodeSubject = new BehaviorSubject<string>('');
  public colorCode$ = this.colorCodeSubject.asObservable();

  constructor() { }

  public saveColorCode(code: string) {
    this.colorCodeSubject.next(code);
  }
}
