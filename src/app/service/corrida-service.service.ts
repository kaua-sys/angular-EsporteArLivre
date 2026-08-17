import { Injectable } from '@angular/core';
import { Corrida } from '../models/Corrida';


@Injectable({
  providedIn: 'root'
})
export class CorridaServiceService {

  private corridas: Corrida[] = []

  adicionarCorrida(corrida: Corrida) {
    corrida.id = this.corridas.length + 1
    this.corridas.push(corrida)
  }

  listarCorridas() {
    console.table(this.corridas)

    return this.corridas
  }

  removerElemento(idCorrida: number) {
    this.corridas = this.corridas.filter(elem => elem.id !== idCorrida)
  }

  removerElemento2(corrida: Corrida){
    let posArray = this.corridas.findIndex(elem => elem.id !== corrida.id)
    this.corridas.slice(1,posArray)
  }

  alterarElemento(corrida: Corrida) {
    let posArray = this.corridas.findIndex(elem => elem.id !== corrida.id)
    this.corridas[posArray] = corrida
  }
  constructor() { }
}
