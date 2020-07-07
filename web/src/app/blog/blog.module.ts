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

import 'froala-editor/js/plugins.pkgd.min.js'; // Import toàn bộ Froala plugin (Có thể import riêng lẻ từng cái)
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    BlogRoutingModule,
    SharedModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
