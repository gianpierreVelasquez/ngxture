import { TestBed } from '@angular/core/testing';

import { NgxtureService } from './ngxture.service';

describe('NgxturesService', () => {
  let service: NgxtureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxtureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
