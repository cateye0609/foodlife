import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

const routes: Routes = [
    // {
    //     path: 'blogs',
    //     children: [
    //         { path: '', redirectTo: 'list', pathMatch: 'full' },
    //         { path: '/:slug', component: BlogsComponent },
    //         { path: 'list', component: BlogsListComponent },
    //     ]
    // },
    { path: 'blogs', component: BlogsListComponent },
    { path: 'blog/:slug', component: BlogsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
