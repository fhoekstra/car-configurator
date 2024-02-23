import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public colorCode = signal('');

  constructor() { }

  public saveColorCode(code: string) {
    this.colorCode.set(code);
  }
}
