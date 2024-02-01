import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from 'src/app/models/heroes';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'publisher', 'alter_ego', 'first_appearance', 'characters'];
  data: Hero[] = [];

  dataSource = new MatTableDataSource<Hero>;

  searchInput = new FormGroup({
    value: new FormControl('')
  })
  constructor(private heroesService: HeroesService) {

  }

  ngOnInit() {
    this.heroesService.getAllHeroes().subscribe(res => {
      console.log(res)
      this.data = res;
      this.dataSource = new MatTableDataSource<Hero>(this.data);
      this.dataSource.paginator = this.paginator;

    })

  }
}
