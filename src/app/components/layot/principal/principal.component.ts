import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  constructor(private router: Router) {}

  isMateriasPage(): boolean {
    return this.router.url.includes('/materiasRenderizadas');
  }
}
