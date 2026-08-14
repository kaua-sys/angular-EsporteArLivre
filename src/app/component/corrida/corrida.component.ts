import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../models/Corrida';
@Component({
  selector: 'app-corrida',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida.component.html',
  styleUrl: './corrida.component.css'
})
export class CorridaComponent {
   id = ''
   decricao = ''
   data = ''
   distancia = ''

   salvarCorrida (){
    const corrida = new Corrida()
    corrida.descricao = this.decricao
    corrida.data = this.data
    corrida.distancia = this.distancia

    
   }
}
