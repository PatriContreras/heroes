import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailRoutingModule } from './hero-detail-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    HeroDetailRoutingModule,
    MatCardModule
  ],
  declarations: [HeroDetailComponent]
})
export class HeroDetailModule { }
