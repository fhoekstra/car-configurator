import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private modelCodeSubject = new BehaviorSubject<string>('');
  public modelCode$ = this.modelCodeSubject.asObservable();

  constructor() { }

  public saveModelCode(code: string) {
    this.modelCodeSubject.next(code);
  }
}
