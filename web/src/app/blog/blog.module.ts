import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

import { BlogService } from './blog.service';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogsListComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
