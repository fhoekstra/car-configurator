import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private configIdSubject = new BehaviorSubject<number>(-1);
  public configId$ = this.configIdSubject.asObservable();

  private includeYokeSubject = new BehaviorSubject<boolean>(false);
  public includeYoke$ = this.includeYokeSubject.asObservable();

  private includeTowSubject = new BehaviorSubject<boolean>(false);
  public includeTow$ = this.includeTowSubject.asObservable();

  constructor() { }

  public saveConfigId(code: number) {
    this.configIdSubject.next(code);
  }

  public saveIncludeYoke(included: boolean) {
    this.includeYokeSubject.next(included);
  }

  public saveIncludeTow(included: boolean) {
    this.includeTowSubject.next(included);
  }
}
