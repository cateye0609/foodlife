import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NiceSelectModule } from "ng-nice-select";

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SearchComponent } from './shared/components/search/search.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { SuggestsComponent } from './shared/components/suggests/suggests.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SearchModalComponent } from './shared/components/search-modal/search-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

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
    SearchModalComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
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
