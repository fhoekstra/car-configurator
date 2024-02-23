import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  public configId = signal(-1);

  public includeYoke = signal(false);

  public includeTow = signal(false);

  constructor() { }

  public saveConfigId(code: number) {
    this.configId.set(code);
  }

  public saveIncludeYoke(included: boolean) {
    this.includeYoke.set(included);
  }

  public saveIncludeTow(included: boolean) {
    this.includeTow.set(included);
  }
}
