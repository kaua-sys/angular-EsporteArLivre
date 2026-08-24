import { Component } from '@angular/core';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { AtletaServiceService } from '../../service/atleta-service.service';

@Component({
  selector: 'app-inscricoes',
  standalone: true,
  imports: [],
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})
export class InscricoesComponent {
  atleta = ''
  cpf = 0
  corrida = ''
  distancia5 = ''
  distancia10 = ''
  distancia25 = ''
  tamanho = ''
  categoria = ''


}
