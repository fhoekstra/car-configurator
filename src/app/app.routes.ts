import { Routes } from '@angular/router';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';

export const routes: Routes = [
    {path: 'step-1', component: ModelAndColorComponent},
    {path: '**', redirectTo: '/step-1'}
];
