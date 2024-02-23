import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../state/model.service';
import { ColorService } from '../state/color.service';
import { ImageComponent } from '../image/image.component';

type Model = {
  description: string;
  code: string;
  colors: Color[];
};

type Color = {
  code: string;
  description: string;
  price: number;
};

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

  availableModels = toSignal(
    this.http.get<Model[]>('http://127.0.0.1:8777/models'),
    { initialValue: [] },
  );

  availableColors = computed(
    () =>
      this.availableModels().filter(
        (m) => m.code == this._selectedModelCode(),
      )[0]?.colors,
  );

  constructor(
    private http: HttpClient,
    private modelService: ModelService,
    private colorService: ColorService,
  ) { }

  set SelectedModelCode(modelCode: string) {
    this._selectedModelCode.set(modelCode);
    this.modelService.saveModelCode(modelCode);
    this.SelectedColorCode = '';
  }

  get SelectedModelCode() {
    return this._selectedModelCode();
  }

  set SelectedColorCode(colorCode: string) {
    this._selectedColorCode.set(colorCode);
    this.colorService.saveColorCode(colorCode);
  }

  get SelectedColorCode() {
    return this._selectedColorCode();
  }
}
