import { TestBed } from '@angular/core/testing';

import { SubmateriaService } from './submateria.service';

describe('SubmateriaService', () => {
  let service: SubmateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
