import { Router, Routes } from '@angular/router';
import { ModelAndColorComponent } from './model-and-color/model-and-color.component';
import { OptionsComponent } from './options/options.component';
import { SummaryComponent } from './summary/summary.component';
import { inject } from '@angular/core';
import { ModelService } from './state/model.service';
import { OptionsService } from './state/options.service';

const canActivateOptions = () => {
  const canActivate = inject(ModelService).IsModelAndColorChosen();
  if (!canActivate) {
    const router = inject(Router);
    router.navigate(['/step-1']);
  }
  return canActivate;
};

const canActivateSummary = () => inject(OptionsService).isConfigSelected();

export const routes: Routes = [
  { path: 'step-1', component: ModelAndColorComponent },
  {
    path: 'step-2',
    component: OptionsComponent,
    canActivate: [canActivateOptions],
  },
  {
    path: 'step-3',
    component: SummaryComponent,
    canActivate: [canActivateSummary],
  },
  { path: '', redirectTo: '/step-1', pathMatch: 'full' },
];
