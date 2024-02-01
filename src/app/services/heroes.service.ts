import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../models/heroes';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  baseUrl = 'http://localhost:3000/heroes';

  constructor(private _http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.baseUrl)
  }

  createNewHero(body: Hero): Observable<Hero> {
    return this._http.post<Hero>(this.baseUrl, body)
  }

}
