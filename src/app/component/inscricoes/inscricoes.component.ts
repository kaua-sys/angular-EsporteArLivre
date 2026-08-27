import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';
import { Corrida } from '../../models/Corrida';

@Component({
  selector: 'app-inscricoes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})
export class InscricoesComponent implements OnInit {

  // Signals para armazenar os dados recebidos das APIs
  listaAtletas = signal<Atleta[]>([]);
  listaCorridas = signal<Corrida[]>([]);

  // Variáveis para guardar a escolha do formulário
  atletaSelecionadoId: number | string = '';
  cpfBusca: string = '';
  corridaSelecionadaId: number | string = '';
  distanciaSelecionada: string = '';
  tamanho: string = '';
  categoria: string = '';
  termoAceito: boolean = false;

  constructor(
    private corridaService: CorridaServiceService,
    private atletaService: AtletaServiceService
  ) {}

  ngOnInit() {
    this.carregaInscricoes();
  }

  carregaInscricoes() {
    // 1. Carrega os Atletas ordenados por nome
    this.atletaService.listarAtletas().subscribe({
      next: (dadosAtletas) => {
        this.listaAtletas.set([...dadosAtletas].sort((a, b) => a.nome.localeCompare(b.nome)));
      },
      error: (msgErro) => console.log("Erro ao listar Atletas ", msgErro)
    });

    // 2. Carrega as Corridas ordenadas por descrição
    this.corridaService.listarCorridas().subscribe({
      next: (dadosCorridas) => {
        this.listaCorridas.set([...dadosCorridas].sort((a, b) => a.descricao.localeCompare(b.descricao)));
      },
      error: (msgErro) => console.log("Erro ao listar Corridas ", msgErro)
    });
  }

  buscarPorCpf() {
  if (!this.cpfBusca) return;

  // 1. Procura o atleta na lista pelo CPF
  const atletaEncontrado = this.listaAtletas().find(a => Number(a.cpf) === Number(this.cpfBusca));

  // 2. Se encontrar, atualiza a variável do select automaticamente
  if (atletaEncontrado) {
    this.atletaSelecionadoId = atletaEncontrado.id;
  } else {
    console.log('Atleta não encontrado para este CPF.');
  }
}

get corridaSelecionada(): Corrida | undefined {
  if (!this.corridaSelecionadaId) return undefined;
  
  return this.listaCorridas().find(
    c => String(c.id) === String(this.corridaSelecionadaId)
  );
}

finalizarInscricao() {
  // 1. Validação simples dos campos obrigatórios
  if (!this.atletaSelecionadoId) {
    alert('Por favor, selecione um atleta.');
    return;
  }

  if (!this.corridaSelecionadaId) {
    alert('Por favor, selecione uma corrida.');
    return;
  }

  if (!this.distanciaSelecionada) {
    alert('Por favor, selecione a distância da prova.');
    return;
  }

  if (!this.termoAceito) {
    alert('Você precisa aceitar os termos do regulamento para continuar.');
    return;
  }

  // 2. Monta o objeto com os dados da inscrição
  const dadosInscricao = {
    atletaId: this.atletaSelecionadoId,
    corridaId: this.corridaSelecionadaId,
    distancia: this.distanciaSelecionada,
    tamanhoCamiseta: this.tamanho,
    categoria: this.categoria
  };

  console.log('Inscrição realizada com sucesso:', dadosInscricao);
  alert('Inscrição realizada com sucesso! Redirecionando para o pagamento...');
}
}
