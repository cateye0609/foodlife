import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './_guard/auth.guard';
// Modules
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { BlogModule } from './blog/blog.module';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // HeaderComponent,
    // FooterComponent,
    // SearchComponent,
    // BlogsComponent,
    // SuggestsComponent,
    AboutComponent,
    RecipesComponent,
    CategoriesComponent,
    SearchResultPageComponent,
    // SearchModalComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    ProfileModule,
    BlogModule,
    AppRoutingModule,
    ToastNoAnimationModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
