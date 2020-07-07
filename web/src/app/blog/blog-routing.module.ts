import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guard/auth.guard';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogsByTagComponent } from './blogs-by-tag/blogs-by-tag.component';
import { BlogsByAuthorComponent } from './blogs-by-author/blogs-by-author.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

const routes: Routes = [
    { path: 'blogs', component: BlogsListComponent },
    { path: 'blog/:slug', component: BlogsComponent },
    { path: 'tag/:tag', component: BlogsByTagComponent },
    { path: 'author/:author', component: BlogsByAuthorComponent },
    { path: 'create-blog', component: CreateBlogComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
