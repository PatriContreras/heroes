import { Hero } from './../../models/heroes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { HeroesService } from 'src/app/services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'publisher', 'alter_ego', 'first_appearance', 'characters', 'actions'];
  data: Hero[] = [];
  filteredData: Hero[] | [];

  dataSource = new MatTableDataSource<Hero>;

  searchInput = new FormGroup({
    value: new FormControl('')
  })

  displaySpinner = false;

  constructor(private heroesService: HeroesService, public dialog: MatDialog, private router: Router) {

  }

  ngOnInit() {
    this.heroesService.getAllHeroes().subscribe(res => {
      this.data = res;
      this.filteredData = structuredClone(res);
      this.dataSource = new MatTableDataSource<Hero>(this.filteredData);
      this.dataSource.paginator = this.paginator;
    })
  }

  search = (): void => {
    this.filteredData = this.data.filter(hero => hero.name?.includes(this.searchInput.value.value));
    this.dataSource = new MatTableDataSource<Hero>(this.filteredData);
    this.dataSource.paginator = this.paginator;
  }

  //TODO FIX SPINNER
  // ADD CATCH ERROR
  addHero = async (): Promise<any> => {
    const dialogRef = this.dialog.open(DialogComponent);
    const result = await lastValueFrom(dialogRef.afterClosed())
    this.displaySpinner = true;
    this.heroesService.createNewHero(result.value).subscribe(() =>
      this.displaySpinner = false
    )
  }

  editHero = async (id: string): Promise<any> => {
    const hero = this.data.filter(hero => hero.id === id);
    const dialogRef = this.dialog.open(DialogComponent, { data: hero[0] });
    const result = await lastValueFrom(dialogRef.afterClosed())
    const body = {
      ...result[0],
      id: id
    }

    this.displaySpinner = true;
    this.heroesService.updateHero(body).subscribe(() =>
      this.displaySpinner = false
    )
  }

  deleteHero = async (hero: Hero): Promise<any> => {
    const dialogRef = this.dialog.open(DialogDeleteComponent, { data: hero.name });
    this.displaySpinner = true;
    await lastValueFrom(dialogRef.afterClosed())
    this.heroesService.deleteHero(hero.id).subscribe(() =>
      this.displaySpinner = false
    )
  }

  navigate(id: number) {
    this.router.navigate([`hero/${id}`])
  }

}


