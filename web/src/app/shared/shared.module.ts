import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchModalComponent
  ]
})
export class SharedModule { }
