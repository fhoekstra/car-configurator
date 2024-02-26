import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  public configId = signal(-1);

  public includeYoke = signal(false);

  public includeTow = signal(false);

  constructor() { }

  public resetOptions() {
    this.configId.set(-1);
    this.includeYoke.set(false);
    this.includeTow.set(false);
  }

  isConfigSelected = computed(() => this.configId() !== -1);

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
