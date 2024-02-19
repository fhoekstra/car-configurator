import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

type Model = {
  description: string
}

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent {

  constructor(private http: HttpClient) {}
  models: Model[] = [];

  fetch = () => {
    console.log("running fetch")
    this.http.get<Model[]>('./models').pipe(tap(
      value => {
        console.log(value)
        this.models=value
      }
    ))
  }
}
