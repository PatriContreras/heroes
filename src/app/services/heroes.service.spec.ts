/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Heroes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService],
      imports: [HttpClientModule]
    });
  });

  it('should create service', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));
});
