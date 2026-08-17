import { Injectable } from '@angular/core';
import { Atleta } from '../models/Atleta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtletaServiceService {
  /*
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
  }*/
  constructor(private http: HttpClient) { }

  listarAtletas(): Observable<Atleta[]> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    return this.http.get<Atleta[]>(urlApi);
  }

  listarAtleta(idAtleta: number): Observable<Atleta>{
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    return this.http.get<Atleta>(urlApi)
  }

  salvarAtleta(atleta:Atleta): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    return this.http.post<Atleta>(urlApi,atleta)
  }

  excluirAtleta(idAtleta:number): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    return this.http.delete<Atleta>(urlApi)
  }

  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${atleta.id}`
    return this.http.put<Atleta>(urlApi,atleta)
  }
}
