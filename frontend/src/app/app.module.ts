import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NiceSelectModule } from "ng-nice-select";

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { SearchComponent } from './components/commons/search/search.component';
import { BlogsComponent } from './components/pages/blogs/blogs.component';
import { SuggestsComponent } from './components/commons/suggests/suggests.component';
import { AboutComponent } from './components/pages/about/about.component';
import { RecipesComponent } from './components/pages/recipes/recipes.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { SearchModalComponent } from './components/commons/search-modal/search-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    BlogsComponent,
    SuggestsComponent,
    AboutComponent,
    RecipesComponent,
    CategoriesComponent,
    SearchModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NiceSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
