import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../state/model.service';
import { ImageComponent } from '../image/image.component';
import { FetchModelsService } from '../repositories/fetch-models.service';
import { OptionsService } from '../state/options.service';

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, ImageComponent],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss',
})
export class ModelAndColorComponent {
  private _selectedModelCode = this.modelState.modelCode;
  selectedColorCode = this.modelState.colorCode;

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
    private optionsState: OptionsService,
  ) { }

  set SelectedModelCode(modelCode: string) {
    this._selectedModelCode.set(modelCode);
    this.optionsState.resetOptions();
    this.selectedColorCode.set('');
  }

  get SelectedModelCode() {
    return this._selectedModelCode();
  }
}
