import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  models$ = new Observable();
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.models$ = this.http.get<Model[]>('http://127.0.0.1:8777/models').pipe(tap(
      value => {
        console.log(value)
      }
    ))
  }
}
