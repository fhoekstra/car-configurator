import { Component, computed } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { ModelService } from '../state/model.service';
import { FetchModelsService } from '../repositories/fetch-models.service';
import { OptionsService } from '../state/options.service';
import { FetchOptionsService } from '../repositories/fetch-options.service';
import { CurrencyPipe, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe, NgIf, UpperCasePipe],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  private selectedModelCode = this.modelState.modelCode;
  selectedModel = computed(
    () =>
      this.fetchModels
        .availableModels()
        .filter((m) => this.selectedModelCode() == m.code)[0],
  );

  private selectedConfigId = this.optionsState.configId;
  selectedConfig = computed(() => {
    if (this.selectedModelCode())
      return this.availableOptions()?.configs.filter(
        (c) => c.id == this.selectedConfigId(),
      )[0];
    else {
      return { description: '', id: -1, price: 0, range: 0, speed: 0 };
    }
  });

  private selectedColorCode = this.modelState.colorCode;
  selectedColor = computed(
    () =>
      this.selectedModel().colors.filter(
        (c) => this.selectedColorCode() == c.code,
      )[0],
  );

  isYokeIncluded = this.optionsState.includeYoke;
  isTowIncluded = this.optionsState.includeTow;
  private availableOptions = this.fetchOptions.availableOptions;

  totalCost = computed(() => {
    let total = 0;
    if (this.selectedConfig()) total += this.selectedConfig()?.price ?? 0;
    if (this.selectedColor()) total += this.selectedColor()?.price ?? 0;
    if (this.isTowIncluded()) total += 1000;
    if (this.isYokeIncluded()) total += 1000;
    return total;
  });

  constructor(
    private modelState: ModelService,
    private fetchModels: FetchModelsService,
    private optionsState: OptionsService,
    private fetchOptions: FetchOptionsService,
  ) { }
}
