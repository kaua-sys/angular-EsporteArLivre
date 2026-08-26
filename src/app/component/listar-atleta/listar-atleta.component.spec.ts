import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarAtletaComponent } from './listar-atleta.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import{ describe, beforeEach,afterEach } from 'vitest'

import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';

describe('ListarAtletaComponent', () => {
  let component: ListarAtletaComponent;
  let fixture: ComponentFixture<ListarAtletaComponent>;
  let service: AtletaServiceService;
  let httpMock: HttpTestingController;

  const mockAtletas: Atleta[] = [
    {
      id: 1,
      nome: 'João grilo',
      cpf: 7642424224,
      sexo: 'M',
      cep: 9424214,
      ruaLogradouro: 'safsa',
      bairro: 'bairro 1safsa',
      cidade: 'cidade 1sfafas',
      uf: 'uf 1sfas',
      data: '1242-02-22'
    },
    {
      id: 2,
      nome: 'joeymson',
      cpf: 24421421,
      sexo: 'M',
      cep: 242241214,
      ruaLogradouro: 'dsadsada',
      bairro: 'dssadsadsa',
      cidade: 'sadsadsa',
      uf: 'dsadsa',
      data: '1563-02-22'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAtletaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
    
    service = TestBed.inject(AtletaServiceService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ListarAtletaComponent);
    component = fixture.componentInstance;

  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create e carregar lista do serviço', () => {

    fixture.detectChanges();

    const request = httpMock.expectOne(
      'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta'
    );
    expect(request.request.method).toBe('GET');

    request.flush(mockAtletas);

    expect(component).toBeTruthy();
    expect(component.listaAtletas().length).toBe(2);
    expect(component.listaAtletas()[0].nome).toBe('João grilo');
    expect(component.listaAtletas()[1].nome).toBe('joeymson');
  });

  //Post
  it('deve adicionar uma pessoa', () =>{

    const atleta: Atleta = {
      'nome': 'Maria Flor',
      'cpf': 12345678910,
      'sexo': 'F',
      'cep': 49123123,
      'bairro': 'Centro',
      'cidade': 'Aracaju',
      'uf': 'Se',
      'data': '2000-02-25',
      'id': 3,
      'ruaLogradouro': 'Rua sei lá das quantas'
    }

    service.salvarAtleta(atleta).subscribe(atletas => {

      expect(atletas).toEqual(atletas);

    })

    const request = httpMock.expectOne(
      'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta'
    );

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(atleta);

    request.flush(atleta);

  });

  //PUT
  it('deve editar um atleta', () => {

    const atleta: Atleta = {
      'nome': 'João Souza',
      'cpf': 12345678910,
      'sexo': 'M',
      'cep': 49123123,
      'bairro': 'Centro',
      'cidade': 'Aracaju',
      'uf': 'Se',
      'data': '2000-02-25',
      'id': 1,
      'ruaLogradouro': 'Rua Sei lá das quantas'
    }
    
    service.alterarAtleta(atleta).subscribe(atletas => {
      expect(atletas).toEqual(atleta);

    });

    const request = httpMock.expectOne(
      'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/1'
    );

    expect(request.request.method).toBe('PUT');

    expect(request.request.body).toEqual(atleta);

    request.flush(atleta);

  });

  //Delete
  it('deve excluir um atleta', () => {

    service.excluirAtleta(1).subscribe();

    const request = httpMock.expectOne(
      'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta/1'
    )

    expect(request.request.method).toBe('DELETE');

    request.flush(null)
  });

});