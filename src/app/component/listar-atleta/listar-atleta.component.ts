import { Component } from '@angular/core';
import { Atleta } from '../../models/Atleta';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Router } from '@angular/router';
import{ signal} from '@angular/core'

@Component({
  selector: 'app-listar-atleta',
  standalone: true,
  imports: [],
  templateUrl: './listar-atleta.component.html',
  styleUrl: './listar-atleta.component.css'
})
export class ListarAtletaComponent {

  //listaAtletas: Atleta [] = []
  listaAtletas = signal<Atleta[]>([]);

  constructor(private listaService: AtletaServiceService, private router: Router) {}

  //Inicializa automaticamente a função listar
  ngOnInit(){
    this.listar()
  }

  //Função para que ele possa listar os atletas cadastrados e seu dados
  listar() {
    this.listaService.listarAtletas().subscribe({
      next:(dadosAtletas) => {
        //this.listaAtletas = [...dadosAtletas].sorte((a,b) => a.nome.localeCompare(b.nome))
        this.listaAtletas.set([...dadosAtletas].sort((a,b) => a.nome.localeCompare(b.nome)))

        console.table(this.listaAtletas())
      },
      error: (msgErro) => {
        console.log("Erro ao listar Atletas ",msgErro)
      }
    })
  }

  //Função para que possa excluir os atletas e dados cadastrados
  excluir(id:number) {
    if(confirm("Deseja Excluir o Atleta")) {
      this.listaService.excluirAtleta(id).subscribe({
        next: (resposta) => {
          console.log("Excluído com Sucesso !!! ", resposta)

          this.listar()
        },
        error: (msgErro) => {
          console.log("Erro ao listar Atletas ",msgErro)
        }
      })
    }
  }

  //Função para que os dados sejam carregados e possam ser alterados
  carregaDadosAtletaForm(atleta:Atleta) {
    this.router.navigate(['/cadastroAtleta', atleta.id])
  }
}
