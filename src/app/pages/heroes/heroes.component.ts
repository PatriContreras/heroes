import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Hero } from 'src/app/models/heroes';
import { HeroesService } from 'src/app/services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, pipe } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'publisher', 'alter_ego', 'first_appearance', 'characters'];
  data: Hero[] = [];
  filteredData: Hero[] | [];

  dataSource = new MatTableDataSource<Hero>;

  searchInput = new FormGroup({
    value: new FormControl('')
  })

  displaySpinner = false;

  constructor(private heroesService: HeroesService, public dialog: MatDialog) {

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
    this.filteredData = this.data.filter(hero => hero.name.includes(this.searchInput.value.value));
    this.dataSource = new MatTableDataSource<Hero>(this.filteredData);
    this.dataSource.paginator = this.paginator;
  }

  async addHero() {
    const dialogRef = this.dialog.open(DialogComponent);
    const result = await lastValueFrom(dialogRef.afterClosed())
    this.displaySpinner = true;
    this.heroesService.createNewHero(result.value).subscribe()
    this.displaySpinner = false;
  }

}


