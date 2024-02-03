/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from 'src/app/services/heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';

const mockHero = [{
  "id": "1",
  "name": "Batman",
  "publisher": "DC Comics",
  "alter_ego": "Bruce Wayne",
  "first_appearance": "Detective Comics #27",
  "characters": "Bruce Wayne"
}]

const mockService = {
  getAllHeroes: () => of(mockHero)
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let service: HeroesService;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [provideAnimations(), {
        provide: HeroesService,
        useValue: mockService
      },
        MatDialog,],
      imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        SpinnerComponent]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
