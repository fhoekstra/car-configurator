import { Component, computed, signal } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModelService } from '../state/model.service';
import { FetchModelsService } from '../repositories/fetch-models.service';
import { OptionsService } from '../state/options.service';
import { FetchOptionsService } from '../repositories/fetch-options.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Options } from '../types';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe, NgIf],
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

  private selectedConfigId = toSignal(this.optionsState.configId$);
  selectedConfig = computed(() => {
    if (this.selectedModelCode())
      return this.availableOptions()?.configs.filter(
        (c) => c.id == this.selectedConfigId(),
      )[0];
    else {
      return { description: '', id: -1, price: 0, range: 0, speed: 0 };
    }
  });

  isYokeIncluded = toSignal(this.optionsState.includeYoke$);
  isTowIncluded = toSignal(this.optionsState.includeTow$);
  availableOptions = this.fetchOptions.availableOptions;

  constructor(
    private modelState: ModelService,
    private fetchModels: FetchModelsService,
    private optionsState: OptionsService,
    private fetchOptions: FetchOptionsService,
  ) {}
}
