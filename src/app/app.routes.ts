import { Routes } from '@angular/router';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';
import { OptionsComponent } from './options/options.component';
import { SummaryComponent } from './summary/summary.component';
import { inject } from '@angular/core';
import { ModelService } from './state/model.service';
import { ColorService } from './state/color.service';
import { combineLatest, map } from 'rxjs';

export const canActivateOptions = () => {
  return combineLatest([
    inject(ModelService).modelCode$,
    inject(ColorService).colorCode$,
  ]).pipe(map(([a, b]) => a !== '' && b !== ''));
};

export const routes: Routes = [
  { path: 'step-1', component: ModelAndColorComponent },
  {
    path: 'step-2',
    component: OptionsComponent,
    canActivate: [canActivateOptions],
  },
  { path: 'step-3', component: SummaryComponent },
  { path: '', redirectTo: '/step-1', pathMatch: 'full' },
];
