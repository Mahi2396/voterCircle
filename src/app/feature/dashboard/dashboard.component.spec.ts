import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { SearchComponent } from 'src/app/shared/component/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, SearchComponent, CardComponent],
      imports: [
        SharedModule,
        NgxAutocompleteModule,
        BrowserDynamicTestingModule,
      ],
      providers: [DashboardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onScroll', () => {
    it('Should increament pageNo on scoll', () => {
      component.onScroll();
      expect(component.filters.pageNo).toEqual(1);
    });
  });

  describe('search', () => {
    it('Should sent search word to filter', () => {
      component.search('potato');
      expect(component.filters.searchWord).toEqual('potato');
    });
  });

  describe('removeIngredients', () => {
    it('Should remove selected index ingrents', () => {
      component.filters['ingredients'] = ['potato', 'garlic'];
      component.removeIngredients(1);
      expect(component.filters.ingredients.length).toEqual(1);
    });
  });
  describe('reset', () => {
    it('Should reset pageNo, list, title', () => {
      component.reset();
      expect(component.filters.pageNo).toEqual(0);
      expect(component.recipesList.title).toEqual('');
      expect(component.recipesList.results).toEqual([]);
    });
  });
});
