import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [HeroesComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule, MatTableModule, MatDialogModule, MatProgressSpinnerModule
  ]
})
export class HeroesModule { }
