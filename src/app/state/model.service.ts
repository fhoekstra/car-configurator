import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public modelCode = signal('');
}
