import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../state/model.service';
import { HttpClient } from '@angular/common/http';

type Options = {
  configs: Config[];
  towHitch: boolean;
  yoke: boolean;
};

type Config = {
  description: string;
  id: number;
  price: number;
  range: number;
  speed: number;
};

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  private _selectedConfigId = signal<number>(-1);
  private _isTowHitchSelected = signal<boolean>(false);
  private _isYokeSelected = signal<boolean>(false);

  modelCode = toSignal(this.modelState.modelCode$);
  availableOptions = toSignal(
    this.http.get<Options>(`http://127.0.0.1:8777/options/${this.modelCode()}`),
    { initialValue: { configs: [], towHitch: false, yoke: false } },
  );
  availableConfigs = computed(() => this.availableOptions().configs);

  selectedConfig = computed<Config>(() => {
    const selectedConfig = this.availableConfigs().filter(
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
    console.log(this.availableOptions());
    return this.availableOptions().towHitch;
  });
  isYokeAvailable = computed(() => this.availableOptions().yoke);

  constructor(
    private http: HttpClient,
    private modelState: ModelService,
  ) { }

  set SelectedConfigId(configId: number) {
    this._selectedConfigId.set(configId);
  }

  get SelectedConfigId() {
    return this._selectedConfigId();
  }

  set IsYokeSelected(selected: boolean) {
    this._isYokeSelected.set(selected);
  }

  get IsYokeSelected() {
    return this._isYokeSelected();
  }

  set IsTowHitchSelected(selected: boolean) {
    this._isTowHitchSelected.set(selected);
  }

  get IsTowHitchSelected() {
    return this._isTowHitchSelected();
  }
}
