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

  //Listar elementos
  listarAtletas(): Observable<Atleta[]> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    return this.http.get<Atleta[]>(urlApi);
  }

  //Listar elemento
  listarAtleta(idAtleta: number): Observable<Atleta>{
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    return this.http.get<Atleta>(urlApi)
  }

  //Adicionando elemento
  salvarAtleta(atleta:Atleta): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    return this.http.post<Atleta>(urlApi,atleta)
  }

  //Remover elemento
  excluirAtleta(idAtleta:number): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    return this.http.delete<Atleta>(urlApi)
  }

  //Atlrerando elemento do Array
  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${atleta.id}`
    return this.http.put<Atleta>(urlApi,atleta)
  }
  calcularIdade(dataNascimento: string): number{
    if (!dataNascimento) return 0
  const hj = new Date()
  const nascimento = new Date (dataNascimento)
  let idade = hj.getFullYear() - nascimento.getFullYear()
  const mes = hj.getMonth() - nascimento.getMonth()
  
  if(mes <0 || (mes === 0 && hj.getDate() <nascimento.getDate())){
    idade--
  }
  return idade
    
  }
}
