import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";

import { SearchComponent } from "./search.component";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const DEBOUNCE_TIME = 400;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.delayTime = DEBOUNCE_TIME;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Input Values", () => {
    it('should show correct placeholder if "placeholder" property is provided', () => {
      component.placeholder = "Search by name";
      fixture.detectChanges();
      const searchElement = fixture.nativeElement.querySelector(
        ".search-box input"
      );
      expect(searchElement.placeholder).toEqual("Search by name");
    });
  });

  describe("search", () => {
    beforeEach(() => {
      spyOn(component.doneTyping, "emit");
    });
    it("should emit doneTyping correctly if string length >= 3", fakeAsync(() => {
      const term = "lookbook";
      component.search(term);
      tick(DEBOUNCE_TIME);
      expect(component.doneTyping.emit).toHaveBeenCalledTimes(1);
    }));

    it("should not emit doneTyping correctly if string length < 3", fakeAsync(() => {
      const term = "12";
      component.search(term);
      tick(DEBOUNCE_TIME);
      expect(component.doneTyping.emit).toHaveBeenCalledTimes(0);
    }));

    it("should call next of subject with correct data", () => {
      component.search("12");
      component.searchTerms.subscribe((term) => {
        expect(term).toEqual("12");
      });
    });
  });
});
