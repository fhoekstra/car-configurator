import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

type Model = {
  description: string
}

@Component({
  selector: 'app-model-and-color',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './model-and-color.component.html',
  styleUrl: './model-and-color.component.scss'
})
export class ModelAndColorComponent {

  constructor(private http: HttpClient) {}
  models$ = this.http.get<Model[]>('./models').pipe(tap(
      value => {
        console.log(value)
      }
    ))
}
