import { TestBed } from '@angular/core/testing';

import { AtletaServiceService } from './atleta-service.service';

describe('AtletaServiceService', () => {
  let service: AtletaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtletaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
