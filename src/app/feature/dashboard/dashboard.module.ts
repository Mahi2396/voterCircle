import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './card/card.component';
import { SearchComponent } from 'src/app/shared/component/search/search.component';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';

@NgModule({
  declarations: [DashboardComponent, CardComponent, SearchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxAutocompleteModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
