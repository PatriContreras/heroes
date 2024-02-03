import { Hero } from './../../models/heroes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { HeroesService } from 'src/app/services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, concatMap, delay, lastValueFrom, of, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { DialogDeleteComponent } from 'src/app/components/dialog-delete/dialog-delete.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
    valuePartialName: new FormControl(''),
    valueName: new FormControl('')
  })

  displaySpinner = false;

  constructor(private heroesService: HeroesService, public dialog: MatDialog, private router: Router) {

  }

  ngOnInit() {
    this.heroesService.getAllHeroes().pipe(untilDestroyed(this)).subscribe(res => {
      this.data = res;
      this.filteredData = structuredClone(res);
      this.dataSource = new MatTableDataSource<Hero>(this.filteredData);
      this.dataSource.paginator = this.paginator;
    })
  }

  searchPartialName = (): void => {
    this.filteredData = this.data.filter(hero => hero.name?.toLowerCase().includes(this.searchInput.value.valuePartialName.toLowerCase()));
    this.dataSource = new MatTableDataSource<Hero>(this.filteredData);
    this.dataSource.paginator = this.paginator;
  }

  searchExactName = (event): void => {
    this.heroesService.getHeroesWithName(event.target.value).pipe(
      untilDestroyed(this),
      tap(() => this.displaySpinner = true),
      delay(1000),
      catchError((err) => of(err))
    ).subscribe((res) => {
      this.dataSource = new MatTableDataSource<Hero>(res);
      this.dataSource.paginator = this.paginator;
      this.displaySpinner = false
    });
  }

  addHero = async (): Promise<any> => {
    const dialogRef = this.dialog.open(DialogComponent);
    const result = await lastValueFrom(dialogRef.afterClosed())
    if (result) {
      this.heroesService.createNewHero(result.value).pipe(
        untilDestroyed(this),
        tap(() => this.displaySpinner = true),
        delay(2000),
        concatMap(() => this.heroesService.getAllHeroes()),
        catchError((err) => of(err))
      ).subscribe((res) => {
        this.dataSource = new MatTableDataSource<Hero>(res);
        this.dataSource.paginator = this.paginator;
        this.displaySpinner = false
      }
      )
    }

  }

  editHero = async (id: string): Promise<any> => {
    const hero = this.filteredData.filter(hero => hero['id'] === id);
    const dialogRef = this.dialog.open(DialogComponent, { data: hero[0] });
    const result = await lastValueFrom(dialogRef.afterClosed())
    if (result) {
      const body = {
        ...result.value,
        id: id
      }

      this.heroesService.updateHero(body).pipe(
        untilDestroyed(this),
        tap(() => this.displaySpinner = true),
        delay(2000),
        concatMap(() => this.heroesService.getAllHeroes()),
        catchError((err) => of(err))
      ).subscribe((res) => {
        this.dataSource = new MatTableDataSource<Hero>(res);
        this.dataSource.paginator = this.paginator;
        this.displaySpinner = false
      })
    }

  }

  deleteHero = async (hero: Hero): Promise<any> => {
    const dialogRef = this.dialog.open(DialogDeleteComponent, { data: hero.name });
    const result = await lastValueFrom(dialogRef.afterClosed())

    if (result !== undefined) {
      this.heroesService.deleteHero(hero.id).pipe(
        untilDestroyed(this),
        tap(() => this.displaySpinner = true),
        delay(2000),
        concatMap(() => this.heroesService.getAllHeroes()),
        catchError((err) => of(err))
      ).subscribe((res) => {
        this.dataSource = new MatTableDataSource<Hero>(res);
        this.dataSource.paginator = this.paginator;
        this.displaySpinner = false
      })
    }

  }

  navigate(id: number) {
    this.router.navigate([`hero/${id}`])
  }

}

