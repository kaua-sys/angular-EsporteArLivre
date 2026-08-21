import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corrida } from '../../models/Corrida';
import { CorridaServiceService } from '../../service/corrida-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-corrida',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corrida.component.html',
  styleUrl: './corrida.component.css'
})
export class CorridaComponent implements OnInit {
  descricao = '';
  data = '';
  distancia5 = false;
  distancia10 = false;
  distancia25 = false;

  idCorrida = 0;
  editarCorrida = false;

  constructor(
    private corridaService: CorridaServiceService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCorrida = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idCorrida > 0) {
      this.editarCorrida = true;
      this.corridaDados(this.idCorrida);
    }
  }
   
  limparCorrida(): void {
    this.descricao = '';
    this.data = '';
    this.distancia5 = false;
    this.distancia10 = false;
    this.distancia25 = false;
  }
   
  corridaDados(idCorrida: number): void {
    this.corridaService.listarCorrida(idCorrida).subscribe({
      next: (dadosCorrida) => {
        this.descricao = dadosCorrida.descricao;
        this.data = dadosCorrida.data;
        this.distancia5 = dadosCorrida.distancia5;
        this.distancia10 = dadosCorrida.distancia10;
        this.distancia25 = dadosCorrida.distancia25;
      },
      error: (msgErro) => {
        console.error('Erro ao Listar Corrida', msgErro);
      }
    });
  }   

  salvarCorrida(): void {
    const corrida = new Corrida();
    corrida.descricao = this.descricao;
    corrida.data = this.data;
    corrida.distancia5 = this.distancia5;
    corrida.distancia10 = this.distancia10;
    corrida.distancia25 = this.distancia25;

    if (this.editarCorrida) {
      corrida.id = this.idCorrida;

      this.corridaService.alterarCorrida(corrida).subscribe({
        next: (resposta) => {
          console.log('Corrida alterada com sucesso:', resposta);
          this.limparCorrida();
          
          this.router.navigate(['/corridas']); 
        },
        error: (msgErro) => console.error('Erro ao alterar corrida:', msgErro)
      });
    } else {
      this.corridaService.adicionarCorrida(corrida).subscribe({
        next: (resposta) => {
          console.log('Corrida adicionada com sucesso:', resposta);
          this.limparCorrida();
         
          this.router.navigate(['/corridas']);
        },
        error: (msgErro) => console.error('Erro ao adicionar corrida:', msgErro)
      });
    }
  }
}