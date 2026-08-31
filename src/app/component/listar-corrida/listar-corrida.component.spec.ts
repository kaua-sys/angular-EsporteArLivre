import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { CorridaServiceService } from '../../service/corrida-service.service';
import { Corrida } from '../../models/Corrida';

describe('CorridaService', () => {

  let service: CorridaServiceService;
  let httpMock: HttpTestingController;

  const urlApi = 'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Corrida';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CorridaServiceService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CorridaServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // GET (Listar todas)
  it('Deve retornar as corridas', () => {
    const corridasMock: Corrida[] = [
      { id: 1, descricao: 'Corrida de Aracaju', data: '2026-09-10', distancia5: true,distancia10: false, distancia25:false },
      { id: 2, descricao: 'Corrida Esporte Livre', data: '2026-10-15', distancia10: true, distancia5:false, distancia25:false }
    ];

    service.listarCorridas().subscribe(corridas => {
      expect(corridas.length).toBe(2);
      expect(corridas[0].descricao).toBe('Corrida de Aracaju');
      expect(corridas[1].descricao).toBe('Corrida Esporte Livre');
    });

    const request = httpMock.expectOne(urlApi);
    expect(request.request.method).toBe('GET');
    request.flush(corridasMock);
  });

  // GET por ID
  it('Deve retornar uma corrida pelo ID', () => {
    const corridaMock: Corrida = {
      id: 1,
      descricao: 'Corrida de Aracaju',
      data: '2026-09-10',
      distancia5: true,
      distancia10: false,
      distancia25: false,
    };

    service.listarCorrida(1).subscribe(corrida => {
      expect(corrida.id).toBe(1);
      expect(corrida.descricao).toBe('Corrida de Aracaju');
    });

    const request = httpMock.expectOne(`${urlApi}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(corridaMock);
  });

  // POST (Adicionar)
  it('Deve adicionar uma corrida', () => {
    const novaCorrida: Corrida = {
      id: 3,
      descricao: 'Nova Corrida',
      data: '2026-11-20',
      distancia25: true,
      distancia10: false,
      distancia5: false,
    };

    service.adicionarCorrida(novaCorrida).subscribe(corrida => {
      expect(corrida).toEqual(novaCorrida);
    });

    const request = httpMock.expectOne(urlApi);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(novaCorrida);
    request.flush(novaCorrida);
  });

  // DELETE (Excluir)
  it('Deve excluir uma corrida', () => {
    service.removerCorrida(1).subscribe();

    const request = httpMock.expectOne(`${urlApi}/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

  // PUT (Alterar)
  it('Deve alterar uma corrida', () => {
    const corridaAlterada: Corrida = {
      id: 1,
      descricao: 'Corrida Alterada',
      data: '2026-12-01',
      distancia5: true,
      distancia10: false,
      distancia25: false,
    };

    service.alterarCorrida(corridaAlterada).subscribe(corrida => {
      expect(corrida).toEqual(corridaAlterada);
    });

    const request = httpMock.expectOne(`${urlApi}/1`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(corridaAlterada);
    request.flush(corridaAlterada);
  });

});