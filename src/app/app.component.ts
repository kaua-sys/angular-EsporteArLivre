import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponentComponent } from './component/menu-component/menu-component.component';
import { AtletaComponent } from './component/atleta/atleta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EsporteArLivre';
}
