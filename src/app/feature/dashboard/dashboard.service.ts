import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from './dashboard.model';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getRecipes(filter: Filter): Observable<any> {
    return this.http.get(
      environment.BASE_URL +
        '?' +
        (filter.ingredients.length
          ? 'i=' + filter.ingredients.toString()
          : '') +
        (filter.searchWord !== null && filter.searchWord !== ''
          ? '&q=' + filter.searchWord
          : '') +
        '&p=' +
        filter.pageNo
    );
  }
}
