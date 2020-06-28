import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { NiceSelectModule } from "ng-nice-select";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
// import { HeaderComponent } from './shared/components/header/header.component';
// import { FooterComponent } from './shared/components/footer/footer.component';
import { SearchComponent } from './shared/components/search/search.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { SuggestsComponent } from './shared/components/suggests/suggests.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
// import { SearchModalComponent } from './shared/components/search-modal/search-modal.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // HeaderComponent,
    // FooterComponent,
    SearchComponent,
    BlogsComponent,
    SuggestsComponent,
    AboutComponent,
    RecipesComponent,
    CategoriesComponent,
    // SearchModalComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    ProfileModule,
    AppRoutingModule,
    NiceSelectModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
