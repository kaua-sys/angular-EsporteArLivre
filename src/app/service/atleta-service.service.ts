import { Injectable } from '@angular/core';
import { Atleta } from '../models/Atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaServiceService {
  //Declarando Array atletas
  private atletas: Atleta[] = []

  //Declaração das funções de manipulção do Array
  //Adicionando elemento
  adicionarAtleta(atleta: Atleta) {
    //Armengue para gerar id
    atleta.id = this.atletas.length + 1
    this.atletas.push(atleta)
  }

  //Listar elementos
  listarAtletas() {
    console.table(this.atletas)

    return this.atletas
  }

  //Remover elemento
  removerElemento(idAtleta: number) {
    this.atletas = this.atletas.filter(elem => elem.id !== idAtleta)
  }

  //Remover elemnto2
  removerElemento2(atleta: Atleta) {
    let posArray = this.atletas.findIndex(elem => elem.id !== atleta.id)
    this.atletas.splice(1, posArray)
  }

  //Atlrerando elemento do Array
  alterarElemento(atleta: Atleta) {
    let posArray = this.atletas.findIndex(elem => elem.id !== atleta.id)
    this.atletas[posArray] = atleta
  }
  constructor() { }
}
