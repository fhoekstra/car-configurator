import { Routes } from '@angular/router';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';
import { OptionsComponent } from './options/options.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
  { path: 'step-1', component: ModelAndColorComponent },
  { path: 'step-2', component: OptionsComponent },
  { path: 'step-3', component: SummaryComponent },
  { path: '', redirectTo: '/step-1', pathMatch: 'full' },
];
