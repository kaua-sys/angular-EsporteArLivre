import { Component, signal } from '@angular/core';
import { Corrida } from '../../models/Corrida';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-corrida',
  standalone: true,
  imports: [],
  templateUrl: './listar-corrida.component.html',
  styleUrl: './listar-corrida.component.css'
})
export class ListarCorridaComponent {

  listaCorrida = signal<Corrida[]>([])

  constructor(private corridaService: CorridaServiceService, private router: Router ) {}

ngOnInit(){
  this.Corridas()
}

Corridas() {
  this.corridaService.listarCorridas().subscribe({
    next:(dadosCorrida) => {
      this.listaCorrida.set([...dadosCorrida].sort((a,b) => a.descricao.localeCompare(b.descricao)))

      console.table(this.listaCorrida())
    },
    error: (msgErro) => {
      console.log("Erro ao listar Atletas ",msgErro)
  }
})
}

excluir(id:number) {
  if(confirm("Deseja Excluir Essa Corrida Marcada")) {
    this.corridaService.removerCorrida(id).subscribe({
      next: (resposta) => {
        console.log("Corrida excluida com sucesso ", resposta)

        this.listaCorrida()
      },
      error: (msgErro) => {
        console.log("Erro ao listar as corridas ",msgErro)
      }
    })
  }
}

carregaDadosCorrida(corrida:Corrida) {
  this.router.navigate(['/cadastroCorridas', corrida.id])
}
}
