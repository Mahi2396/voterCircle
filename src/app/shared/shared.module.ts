import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollComponent } from './component/infinite-scroll/infinite-scroll.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    InfiniteScrollComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    CommonModule,
    TopBarComponent,
    HttpClientModule,
    InfiniteScrollComponent,
  ],
})
export class SharedModule {}
