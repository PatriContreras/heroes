import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'heroes',
  pathMatch: 'full'
},
{
  path: 'heroes',
  loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule)
},
{
  path: 'hero/:id',
  loadChildren: () => import('./pages/hero-detail/hero-detail.module').then(m => m.HeroDetailModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
