import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Model } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FetchModelsService {
  availableModels = toSignal(
    this.http.get<Model[]>('/car-configurator/assets/models'),
    {
      initialValue: [],
    },
  );

  constructor(private http: HttpClient) { }
}
