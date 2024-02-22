import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { canActivateOptions } from '../app.routes';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  canActivateStep2 = toSignal(canActivateOptions());
}