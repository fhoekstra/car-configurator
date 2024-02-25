import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  public modelCode = signal('');
  public colorCode = signal('');

  public IsModelAndColorChosen = computed(() => {
    const isModelChosen = this.modelCode() !== '';
    const isColorChosen = this.colorCode() !== '';
    return isModelChosen && isColorChosen;
  });
}
