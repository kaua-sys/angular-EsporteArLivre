import { Injectable } from '@angular/core';
import { Corrida } from '../models/Corrida';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CorridaServiceService {
  
  constructor(private http: HttpClient) { }

  private corridas: Corrida[] = []

  adicionarCorrida(corrida: Corrida): Observable<Corrida>  {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida`
    return this.http.post<Corrida>(urlApi,corrida)
  }

  listarCorridas(): Observable<Corrida[]> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida`
    return this.http.get<Corrida[]>(urlApi)
  }

  listarCorrida(idCorrida: number): Observable<Corrida>{
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida/${idCorrida}`
    return this.http.get<Corrida>(urlApi)
  }

  removerCorrida(idCorrida: number): Observable<Corrida> {
   const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida/${idCorrida}`
   return this.http.delete<Corrida>(urlApi)
  }

  alterarCorrida(corrida: Corrida): Observable<Corrida> {
    const urlApi = `https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida/${corrida.id}`
    return this.http.put<Corrida>(urlApi,corrida)
  }
}
