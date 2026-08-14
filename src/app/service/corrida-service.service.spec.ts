import { TestBed } from '@angular/core/testing';

import { CorridaServiceService } from './corrida-service.service';

describe('CorridaServiceService', () => {
  let service: CorridaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorridaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
