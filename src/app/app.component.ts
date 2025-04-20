import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrganizadorPartidaComponent } from './view/organizador-partida/organizador-partida.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , OrganizadorPartidaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'filaFutebol';
}
