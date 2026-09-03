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
    //const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    const urlApi = `http://127.0.0.1:8000/pessoa/`
    return this.http.get<Atleta[]>(urlApi);
  }

  //Listar elemento
  listarAtleta(idAtleta: number): Observable<Atleta>{
    //const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    const urlApi = `http://127.0.0.1:8000/pessoa/${idAtleta}`
    return this.http.get<Atleta>(urlApi)
  }

  //Adicionando elemento
  salvarAtleta(atleta:Atleta): Observable<Atleta> {
    //const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta`
    const urlApi = `http://127.0.0.1:8000/pessoa/`
    return this.http.post<Atleta>(urlApi,atleta)
  }

  //Remover elemento
  excluirAtleta(idAtleta:number): Observable<Atleta> {
    //const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${idAtleta}`
    const urlApi = `http://127.0.0.1:8000/pessoa/${idAtleta}`
    return this.http.delete<Atleta>(urlApi)
  }

  //Atlrerando elemento do Array
  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    //const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/${atleta.id}`
    const urlApi = `http://127.0.0.1:8000/pessoa/${atleta.id}`
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
  
  imc(peso: number, altura: number) {
    const Peso = peso
    const Altura = altura

    const imc  = Peso/(Altura*altura)

    return Number(imc.toFixed(2))
  }
  
  classificacaoImc(imc: number): string {

    if(imc < 18.5) {
      return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25){
      return "Peso normal"
    } else if (imc >= 25 && imc < 30) {
      return "Sobrepeso"
    } else if (imc >= 30 && imc < 35) {
      return "Obesidade grau 1"
    } else if (imc >= 35 && imc < 40) {
      return "Obesidade grau 2"
    }
      return "Obesidade grau 3"
    
  }
}
