import { TestBed, inject } from '@angular/core/testing';

import { AnunciosService } from './anuncios.service';

describe('AnunciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnunciosService]
    });
  });

  it('should be created', inject([AnunciosService], (service: AnunciosService) => {
    expect(service).toBeTruthy();
  }));
});
