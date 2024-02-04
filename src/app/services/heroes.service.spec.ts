/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

let mockHeroes = [{
  "id": "1",
  "name": "Batman",
  "publisher": "DC Comics",
  "alter_ego": "Bruce Wayne",
  "first_appearance": "Detective Comics #27",
  "characters": "Bruce Wayne"
},
{
  "id": "2",
  "name": "Superman",
  "publisher": "DC Comics",
  "alter_ego": "Kal-El",
  "first_appearance": "Action Comics #1",
  "characters": "Kal-El"
}]
describe('Service: Heroes', () => {
  let service: HeroesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [HeroesService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj
        }],
      imports: [HttpClientModule]
    });

    service = TestBed.inject(HeroesService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should create service', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all heroes with success', () => {
    httpClientSpy.get.and.returnValue(of(mockHeroes));
    service.getAllHeroes().subscribe((data) => {
      expect(data).toEqual(mockHeroes);
      expect(data.length).toEqual(2);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should get one hero by id', () => {
    httpClientSpy.get.and.returnValue(of(mockHeroes[0]));
    const id = "1";
    service.getHeroById(id).subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(mockHeroes[0]);
      expect(data.name).toEqual(mockHeroes[0].name);
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create a new hero', () => {
    const newHero = {
      "id": "3",
      "name": "Test",
      "publisher": "DC Comics",
      "alter_ego": "Hero test",
      "first_appearance": "test",
      "characters": "test"
    }
    httpClientSpy.post.and.returnValue(of(newHero));

    service.createNewHero(newHero).subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(newHero);
      expect(data.name).toEqual(newHero.name);
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });

  it('should update a hero', () => {
    httpClientSpy.put.and.returnValue(of(mockHeroes[0]));
    mockHeroes[0].name = "new name"
    service.updateHero(mockHeroes[0]).subscribe((data) => {
      expect(data).toBeDefined();
      expect(mockHeroes.length).toEqual(2);
      expect(data.name).toEqual("new name");
    });
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
  });

  it('should delete a hero', () => {
    httpClientSpy.delete.and.returnValue(of(mockHeroes[0]));
    service.deleteHero(mockHeroes[0].id).subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(mockHeroes[0])
      expect(data.name).toEqual(mockHeroes[0].name);
    });
    expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
  });

  it('should get hero by name', () => {
    httpClientSpy.get.and.returnValue(of([mockHeroes[1]]));
    service.getHeroesWithName("Superman").subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toEqual([mockHeroes[1]])
      expect(data[0].name).toEqual("Superman");
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
