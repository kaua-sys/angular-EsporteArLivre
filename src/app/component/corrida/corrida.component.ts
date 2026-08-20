import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../models/Corrida';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corrida',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida.component.html',
  styleUrl: './corrida.component.css'
})
export class CorridaComponent {
   descricao = ''
   data = ''
   distancia = ''

   idCorrida = 0
   editarCorrida = false
   constructor(private corridaService: CorridaServiceService, private http: ActivatedRoute) {
   }

   ngOnInit() {
    this.idCorrida = Number(this.http.snapshot.paramMap.get('id'))

    if(this.idCorrida > 0){
      this.editarCorrida = true
      this.corridaDados(this.idCorrida)
    }
   }
   
   limparCorrida(){
    this.descricao = ''
    this.data = ''
    this.distancia = ''
   }
   
   corridaDados(idCorrida:number){
    this.corridaService.listarCorrida(idCorrida).subscribe({
      next:(dadosCorrida) => {
        this.descricao = dadosCorrida.descricao
        this.data = dadosCorrida.data
        this.distancia = dadosCorrida.distancia
      },
      error:(msgErro) =>{
        console.log('Erro ao Listar Corrida',msgErro)
      }
    })
   }  

   salvarCorrida (){
    const corrida = new Corrida()
    corrida.descricao = this.descricao
    corrida.data = this.data
    corrida.distancia = this.distancia

    if(this.editarCorrida) {
      corrida.id = this.idCorrida

      this.corridaService.adicionarCorrida(corrida).subscribe({
        next:(resposta) =>{
          console.log(resposta)
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
      })
    } else{
      this.corridaService.adicionarCorrida(corrida).subscribe({
        next: (resposta) =>{
          console.log(resposta)
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
      })
    }
    this.limparCorrida()

    this.corridaService.listarCorridas()
   }
}
