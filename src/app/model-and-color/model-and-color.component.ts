import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  imports: [AsyncPipe, NgFor, NgIf, FormsModule],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss',
})
export class ModelAndColorComponent {
  private _selectedModelCode = signal<string>('');
  private _selectedColorCode = signal<string>('');
  showImage = computed(
    () => this._selectedModelCode() && this._selectedColorCode(),
  );
  imageSource = computed(() =>
    this.showImage()
      ? `https://interstate21.com/tesla-app/images/${this._selectedModelCode()}/${this._selectedColorCode()}.jpg`
      : '',
  );

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
    private sanitizer: DomSanitizer,
  ) { }

  safeImageSource() {
    return this.sanitizer.bypassSecurityTrustUrl(this.imageSource());
  }
  set SelectedModelCode(modelCode: string) {
    this._selectedModelCode.set(modelCode);
  }

  get SelectedModelCode() {
    return this._selectedModelCode();
  }

  set SelectedColorCode(colorCode: string) {
    this._selectedColorCode.set(colorCode);
  }

  get SelectedColorCode() {
    return this._selectedColorCode();
  }
}
