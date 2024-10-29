import { TestBed } from '@angular/core/testing';

import { CrudProductTypeService } from './crud-product-type.service';

describe('CrudProductTypeService', () => {
  let service: CrudProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
