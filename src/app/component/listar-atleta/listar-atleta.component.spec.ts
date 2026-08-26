import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarAtletaComponent } from './listar-atleta.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AtletaServiceService } from '../../service/atleta-service.service';
import { Atleta } from '../../models/Atleta';
import { Router, provideRouter } from '@angular/router';

describe('ListarAtletaComponent', () => {
  let component: ListarAtletaComponent;
  let fixture: ComponentFixture<ListarAtletaComponent>;
  let service: AtletaServiceService;
  let httpMock: HttpTestingController;
  let router: Router;

  const API_URL = 'https://6a835a84cb486d243403a3f7.mockapi.io/esportearLivre/Atleta';

  const mockAtletas: Atleta[] = [
    { id: 1, nome: 'João grilo', cpf: 12345678910, sexo: 'M', cep: 49123123, bairro: 'Centro', cidade: 'Aracaju', uf: 'Se', data: '2000-02-25', ruaLogradouro: 'Rua A' },
    { id: 2, nome: 'joeymson', cpf: 10987654321, sexo: 'M', cep: 49123123, bairro: 'Centro', cidade: 'Aracaju', uf: 'Se', data: '2000-02-25', ruaLogradouro: 'Rua B' }
    
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAtletaComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]) // Necessário para o Router funcionar no teste
      ]
    }).compileComponents();
    
    service = TestBed.inject(AtletaServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(ListarAtletaComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create e carregar lista do serviço', () => {
    fixture.detectChanges(); 

    const request = httpMock.expectOne(API_URL);
    expect(request.request.method).toBe('GET');
    request.flush(mockAtletas);

    expect(component).toBeTruthy();
    expect(component.listaAtletas().length).toBe(2);
    expect(component.listaAtletas()[0].nome).toBe('João grilo');
  });

  it('deve excluir um atleta', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    
    component.excluir(1); 

    
    const reqDelete = httpMock.expectOne(`${API_URL}/1`);
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush(null);

    
    const reqGet = httpMock.expectOne(API_URL);
    reqGet.flush(mockAtletas);
  });

  it('deve navegar para a tela de formulário ao editar', () => {
    const spyNavigate = spyOn(router, 'navigate');

    component.carregaDadosAtletaForm(mockAtletas[0]);

    expect(spyNavigate).toHaveBeenCalledWith(['/cadastroAtleta', 1]);
  });

  it('deve calcular a idade chamando o serviço', () => {
    spyOn(service, 'calcularIdade').and.returnValue(25);

    const idade = component.calcular('2000-02-25');

    expect(service.calcularIdade).toHaveBeenCalledWith('2000-02-25');
    expect(idade).toBe(25);
  });
});