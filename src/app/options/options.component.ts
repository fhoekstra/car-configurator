import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
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
  private _selectedConfigId = signal<number>(-1);
  private _isTowHitchSelected = signal<boolean>(false);
  private _isYokeSelected = signal<boolean>(false);

  availableOptions = this.fetchOptions.availableOptions;
  availableConfigs = computed(() =>
    this.availableOptions() ? this.availableOptions()?.configs : [],
  );

  selectedConfig = computed<Config>(() => {
    const selectedConfig = this.availableConfigs()?.filter(
      (c) => c.id == this._selectedConfigId(),
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

  set SelectedConfigId(configId: number) {
    this._selectedConfigId.set(configId);
    this.optionsState.saveConfigId(configId);
  }

  get SelectedConfigId() {
    return this._selectedConfigId();
  }

  set IsYokeSelected(selected: boolean) {
    this._isYokeSelected.set(selected);
    this.optionsState.saveIncludeYoke(selected);
  }

  get IsYokeSelected() {
    return this._isYokeSelected();
  }

  set IsTowHitchSelected(selected: boolean) {
    this._isTowHitchSelected.set(selected);
    this.optionsState.saveIncludeTow(selected);
  }

  get IsTowHitchSelected() {
    return this._isTowHitchSelected();
  }
}
