import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Options } from '../types';
import { ModelService } from '../state/model.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchOptionsService {
  availableOptions = toSignal(
    toObservable(this.modelState.modelCode).pipe(
      switchMap((code) => this.http.get<Options>(`/assets/options/${code}`)),
    ),
  );

  constructor(
    private http: HttpClient,
    private modelState: ModelService,
  ) { }
}
