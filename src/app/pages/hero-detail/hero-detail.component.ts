import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, concatMap } from 'rxjs';
import { Hero } from 'src/app/models/heroes';
import { HeroesService } from 'src/app/services/heroes.service';
import * as text from '../../constants/text'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  text = text;

  hero: Hero;
  constructor(private activatedRoute: ActivatedRoute, private HeroService: HeroesService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      concatMap((res) => this.HeroService.getHeroById(res['id']))
    ).subscribe((hero) => { this.hero = hero; console.log(this.hero) })
  }

}
