import { Component, OnInit } from "@angular/core";
import { retry } from "rxjs/operators";
import { DashboardService } from "./dashboard.service";
import { Filter, List } from "./dashboard.model";

let INGREDIENT_LIST = [
  {
    key: "potatoes",
    value: "potatoes",
  },
  {
    key: "red potatoes",
    value: "red potatoes",
  },
  {
    key: "potato",
    value: "potato",
  },
  {
    key: "sweet potato",
    value: "sweet potato",
  },
  {
    key: "garlic",
    value: "garlic",
  },
  {
    key: "garlic powder",
    value: "garlic powder",
  },
  {
    key: "garlic clove",
    value: "garlic clove",
  },
  {
    key: "clove garlic",
    value: "clove garlic",
  },
  {
    key: "tomato soup",
    value: "tomato soup",
  },
  {
    key: "potato chips",
    value: "potato chips",
  },{
    key: "eggs",
    value: "eggs",
  }, 
];
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public recipesList: List = {
    title: "",
    results: [],
  };
  public isLoader = false;
  public ingredientsList: any = INGREDIENT_LIST;
  public filters: Filter = {
    pageNo: 0,
    searchWord: "",
    ingredients: [],
  };
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {}

  private getRecipes() {
    this.isLoader = true;
    this._dashboardService
      .getRecipes(this.filters)
      .pipe(retry(2))
      .subscribe(
        (recipesResponse) => {
          this.isLoader = false;
          if (this.recipesList["results"].length) {
            this.recipesList["results"] = [
              ...this.recipesList["results"],
              ...recipesResponse["results"],
            ];
          } else {
            this.recipesList = recipesResponse;
          }
        },
        () => {
          this.isLoader = false;
        }
      );
  }

  onScroll() {
    ++this.filters["pageNo"];
    this.getRecipes();
  }

  public search(receipeWord: string): void {
    this.filters["searchWord"] = receipeWord;
    if (this.recipesList.results.length) {
      this.reset();
    } else {
      this.getRecipes();
    }
  }

  public selectEvent(ingredientObject, refObjct) {
    if (this.filters.ingredients.indexOf(ingredientObject.key) === -1) {
      this.filters.ingredients.push(ingredientObject.key);
      if (this.recipesList.results.length) {
        this.reset();
      } else {
        this.getRecipes();
      }
    }
    refObjct.searchInput.nativeElement.value = "";
  }

  public removeIngredients(index: number): void {
    this.filters.ingredients.splice(index, 1);
    if (this.recipesList.results.length) {
      this.reset();
    } else {
      this.getRecipes();
    }
  }

  public reset() {
    this.filters["pageNo"] = 0;
    this.recipesList["title"] = "";
    this.recipesList["results"] = [];
  }
}
