import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../blog.service';
import { BlogModel, BlogsListResponse } from '../../_models/blog.model';

@Component({
  selector: 'app-blogs-by-tag',
  templateUrl: './blogs-by-tag.component.html',
  styleUrls: ['./blogs-by-tag.component.css']
})
export class BlogsByTagComponent implements OnInit {
  @Input('data') blogs_list: BlogModel[] = [];
  page: number = 1;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.blogs_list = [];
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_blog_tag();
  }

  // Lấy blog tag
  get_blog_tag() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let tag = params['tag'];
        this.get_blog_by_tag(tag);
      }
    )
  }

  // Lấy blog theo tag
  get_blog_by_tag(tag: string) {
    this.blogService.get_blog_by_query('tag', tag).subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }
}
