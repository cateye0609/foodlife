import { Component, OnInit, Input } from '@angular/core';

import { BlogModel, BlogsListResponse } from '../../_models/blog.model';

import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  @Input('data') blogs_list: BlogModel[] = [];
  page: number = 1;

  constructor(
    private blogService: BlogService
  ) {
    this.blogs_list = [];
  }

  ngOnInit(): void {
    this.get_blogs_list();
  }

  // Lấy danh sách bài viết
  get_blogs_list() {
    this.blogService.get_all_blogs().subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }
}
