import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../state/model.service';
import { ColorService } from '../state/color.service';
import { ImageComponent } from '../image/image.component';
import { FetchModelsService } from '../repositories/fetch-models.service';

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, ImageComponent],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss',
})
export class ModelAndColorComponent {
  private _selectedModelCode = signal<string>('');
  private _selectedColorCode = signal<string>('');

  availableModels = this.fetchModels.availableModels;
  availableColors = computed(
    () =>
      this.availableModels().filter(
        (m) => m.code == this._selectedModelCode(),
      )[0]?.colors,
  );

  constructor(
    private fetchModels: FetchModelsService,
    private modelState: ModelService,
    private colorState: ColorService,
  ) { }

  set SelectedModelCode(modelCode: string) {
    this._selectedModelCode.set(modelCode);
    this.modelState.modelCode.set(modelCode);
    this.SelectedColorCode = '';
  }

  get SelectedModelCode() {
    return this._selectedModelCode();
  }

  set SelectedColorCode(colorCode: string) {
    this._selectedColorCode.set(colorCode);
    this.colorState.saveColorCode(colorCode);
  }

  get SelectedColorCode() {
    return this._selectedColorCode();
  }
}
