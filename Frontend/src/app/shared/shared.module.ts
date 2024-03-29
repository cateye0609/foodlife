import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NiceSelectModule } from "ng-nice-select";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NiceSelectModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchModalComponent,
    SearchComponent,
    NgxPaginationModule
  ]
})
export class SharedModule { }
