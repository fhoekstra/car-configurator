import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { ModelService } from '../state/model.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  canActivateStep2 = this.modelService.IsModelAndColorChosen;

  constructor(private modelService: ModelService) { }
}
