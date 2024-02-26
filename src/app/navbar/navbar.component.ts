import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { ModelService } from '../state/model.service';
import { OptionsService } from '../state/options.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  canActivateStep = (index: number) => {
    if (index === 2) return this.canActivateStep2();
    if (index === 3) return this.canActivateStep3();
    return true;
  };
  private canActivateStep2 = this.modelService.IsModelAndColorChosen;
  private canActivateStep3 = this.optionsService.isConfigSelected;

  constructor(
    private modelService: ModelService,
    private optionsService: OptionsService,
  ) { }
}
