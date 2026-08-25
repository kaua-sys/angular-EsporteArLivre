import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { AtletaComponent } from '../atleta/atleta.component';

@Component({
  selector: 'app-inscricoes',
  standalone: true,
  imports: [FormsModule],
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

constructor(private corridaService: CorridaServiceService, private atletaService: AtletaServiceService) {}

carregaIncricoes() {
  
}
}
