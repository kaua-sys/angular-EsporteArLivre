import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../models/Corrida';
import { CorridaServiceService } from '../../service/corrida-service.service';

@Component({
  selector: 'app-corrida',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida.component.html',
  styleUrl: './corrida.component.css'
})
export class CorridaComponent {
   id = ''
   descricao = ''
   data = ''
   distancia = ''

   constructor(private corridaService: CorridaServiceService) {
   }
   corridaDados(){
    console.log(this.descricao, this.data, this.distancia)
   }

   limparCorrida(){
    this.descricao = ''
    this.data = ''
    this.distancia = ''
   }
   
   salvarCorrida (){
    const corrida = new Corrida()
    corrida.descricao = this.descricao
    corrida.data = this.data
    corrida.distancia = this.distancia

    this.corridaService.adicionarCorrida(corrida)
    this.limparCorrida()

    this.corridaService.listarCorridas()
   }
}
