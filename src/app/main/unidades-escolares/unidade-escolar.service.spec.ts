import { TestBed } from '@angular/core/testing';

import { UnidadeEscolarService } from './unidade-escolar.service';

describe('UnidadeEscolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadeEscolarService = TestBed.get(UnidadeEscolarService);
    expect(service).toBeTruthy();
  });
});
