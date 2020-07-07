import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { BlogsByTagComponent } from './blogs-by-tag/blogs-by-tag.component';
import { BlogsByAuthorComponent } from './blogs-by-author/blogs-by-author.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

import { BlogService } from './blog.service';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogsListComponent,
    BlogsByTagComponent,
    BlogsByAuthorComponent,
    CreateBlogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    BlogRoutingModule,
    SharedModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
