import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from '../image/image.component';
import { OptionsService } from '../state/options.service';
import { FetchOptionsService } from '../repositories/fetch-options.service';
import { Config } from '../types';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe, ImageComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  selectedConfigId = this.optionsState.configId;
  isTowHitchSelected = this.optionsState.includeTow;
  isYokeSelected = this.optionsState.includeYoke;

  availableOptions = this.fetchOptions.availableOptions;
  availableConfigs = computed(() =>
    this.availableOptions() ? this.availableOptions()?.configs : [],
  );

  selectedConfig = computed<Config>(() => {
    const selectedConfig = this.availableConfigs()?.filter(
      (c) => c.id == this.selectedConfigId(),
    );
    if (!selectedConfig)
      return {
        description: '',
        price: 0,
        range: 0,
        speed: 0,
        id: -1,
      };
    return selectedConfig[0];
  });

  isTowHitchAvailable = computed(() => {
    return this.availableOptions()?.towHitch;
  });
  isYokeAvailable = computed(() => this.availableOptions()?.yoke);

  constructor(
    private fetchOptions: FetchOptionsService,
    private optionsState: OptionsService,
  ) { }
}
