import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';

type Model = {
  description: string
  code: string
  colors: Color[]
}

type Color = {
  code: string
  description: string
  price: number
}

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [AsyncPipe, NgFor, FormsModule],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent {

  private _selectedModelCode = signal<string>("");
  private _selectedColorCode = signal<string>("");
  availableModels = toSignal(this.http.get<Model[]>('http://127.0.0.1:8777/models'), {initialValue: []});
  
  availableColors = computed(
    () => this.availableModels()
    .filter(m => m.code == this._selectedModelCode())[0]
    ?.colors
  )

  constructor(private http: HttpClient) {}

  set SelectedModelCode(modelCode: string) {
    this._selectedModelCode.set(modelCode);
  }

  get SelectedModelCode(){
    return this._selectedModelCode();
  }

  set SelectedColorCode(colorCode: string) {
    this._selectedColorCode.set(colorCode);
  }

  get SelectedColorCode(){
    return this._selectedColorCode();
  }
}
