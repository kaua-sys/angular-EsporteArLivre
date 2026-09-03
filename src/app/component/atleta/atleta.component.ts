import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atleta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './atleta.component.html',
  styleUrl: './atleta.component.css'
})

export class AtletaComponent {
  //Declarando Atributos
  nome = ''
  cpf = 0
  data_nascimento = ''
  sexo = ''
  cep = 0
  rua_logradouro = ''
  bairro = ''
  cidade = ''
  uf = ''
  peso = 0
  altura = 0

  idAtleta = 0
  editar = false

  //Declaração do construtor
  constructor(private atletaService: AtletaServiceService, private http: ActivatedRoute) { }

  //Declaração de funções 
  exibirDados() {
    console.log(this.nome, this.cpf, this.data_nascimento, this.sexo, this.cep, this.rua_logradouro, this.bairro, this.cidade, this.uf,this.peso,this.altura)
    this.limparDados()
  }

  //Inicializa automaticamente ao carregar o componente
  ngOnInit() {
    this.idAtleta = Number(this.http.snapshot.paramMap.get('id'))

    if(this.idAtleta > 0){
      this.editar = true
      this.carregaDados(this.idAtleta)
    }
  }

  //Função para limpar todos os dados quando apertar o botão limpar
  limparDados() {
    this.nome = ''
    this.cpf = 0
    this.sexo = ''
    this.cep = 0
    this.rua_logradouro = ''
    this.bairro = ''
    this.cidade = ''
    this.uf = ''
    this.data_nascimento = ''
    this.altura = 0
    this.peso = 0
  }

  //Função para de carregar todos os dados cadastrados 
carregaDados(idAtleta: number){
  this.atletaService.listarAtleta(idAtleta).subscribe({
    next:(dadosAtleta) => {
       this.nome = dadosAtleta.nome
       this.cpf = dadosAtleta.cpf
       this.sexo = dadosAtleta.sexo
       this.cep = dadosAtleta.cep
       this.rua_logradouro = dadosAtleta.rua_logradouro
       this.bairro = dadosAtleta.bairro
       this.cidade = dadosAtleta.cidade
       this.uf = dadosAtleta.uf
       this.data_nascimento = dadosAtleta.data_nascimento
       this.peso = dadosAtleta.peso
       this.altura = dadosAtleta.altura                                                                                                                                              
    },
    error:(msgErro) =>{
      console.log('Erro ao Listar Atleta', msgErro)
    }
  })
}

  //Função para que envie os dados cadastrados para a que possa listar
  enviarDadosAtletas(){
    const atleta = new Atleta()
    atleta.nome = this.nome
    atleta.cpf = this.cpf
    atleta.sexo = this.sexo
    atleta.data_nascimento = this.data_nascimento
    atleta.cep = this.cep
    atleta.rua_logradouro = this.rua_logradouro
    atleta.bairro = this.bairro
    atleta.cidade = this.cidade
    atleta.uf = this.uf
    atleta.peso = this.peso
    atleta.altura = this.altura

    if(this.editar) {
      atleta.id = this.idAtleta

      this.atletaService.alterarAtleta(atleta).subscribe({
        next: (resposta) =>{
          console.log(resposta)
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
      })
    } else {
      this.atletaService.salvarAtleta(atleta).subscribe({
        next: (resposta) =>{
          console.log(resposta)
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
      })
      
    }

    //Chamando função para que limpe os dados quando cadastrar
    this.limparDados()

    this.atletaService.listarAtletas()

    
  }
}
