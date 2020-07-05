import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
// import { BlogsComponent } from './pages/blogs/blogs.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'blogs', component: BlogsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
