import { TestBed } from '@angular/core/testing';

import { BindingDataService } from './binding-data.service';

describe('BindingDataService', () => {
  let service: BindingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BindingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
