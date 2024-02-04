/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from 'src/app/services/heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/models/heroes';
import { Router } from '@angular/router';

const mockHeroes = [{
  "id": "1",
  "name": "Batman",
  "publisher": "DC Comics",
  "alter_ego": "Bruce Wayne",
  "first_appearance": "Detective Comics #27",
  "characters": "Bruce Wayne"
},
{
  "id": "2",
  "name": "Superman",
  "publisher": "DC Comics",
  "alter_ego": "Kal-El",
  "first_appearance": "Action Comics #1",
  "characters": "Kal-El"
}]

const mockService = {
  getAllHeroes: (): Observable<Hero[]> => of(mockHeroes),
  getHeroById: (id: string): Observable<Hero[]> => of(mockHeroes),
  createNewHero: (body: Hero): Observable<Hero> => of(mockHeroes[0]),
  updateHero: (body: Hero): Observable<Hero> => of(mockHeroes[0]),
  deleteHero: (body: Hero): Observable<Hero> => of(mockHeroes[0]),
  getHeroesWithName: (text: string) => of(mockHeroes[1])
}

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let service: HeroesService;
  let fixture: ComponentFixture<HeroesComponent>;
  let router: Router;

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
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all heroes in Oninit', () => {
    spyOn(service, 'getAllHeroes').withArgs().and.returnValue(of(mockHeroes))
    component.ngOnInit();
    expect(service.getAllHeroes).toHaveBeenCalled()
    expect(component.data).toEqual(mockHeroes);
    expect(component.filteredData).toEqual(mockHeroes);
    expect(component.dataSource.data).toEqual(mockHeroes);
    expect(component.dataSource.paginator).toBeDefined();
  });

  it('should search for heroes with exact name and update data source on successful response', () => {

    spyOn(service, 'getHeroesWithName').withArgs("Superman").and.returnValue(of([mockHeroes[1]]))

    component.searchExactName({ target: { value: 'Superman' } });
    expect(service.getHeroesWithName).toHaveBeenCalledWith('Superman');
  });

  it('should navigate to hero detail', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const id = 1;
    component.navigate(id);
    expect(navigateSpy).toHaveBeenCalledWith([`hero/${id}`]);
  });
});
