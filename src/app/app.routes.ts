import { Router, Routes } from '@angular/router';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';
import { OptionsComponent } from './options/options.component';
import { SummaryComponent } from './summary/summary.component';
import { inject } from '@angular/core';
import { ModelService } from './state/model.service';

export const canActivateOptions = () => {
  const canActivate = inject(ModelService).IsModelAndColorChosen();
  if (!canActivate) {
    const router = inject(Router);
    router.navigate(['/step-1']);
  }
  return canActivate;
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
