import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogModel, BlogsListResponse } from '../../_models/blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blogs-by-author',
  templateUrl: './blogs-by-author.component.html',
  styleUrls: ['./blogs-by-author.component.css']
})
export class BlogsByAuthorComponent implements OnInit {
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
    this.get_blog_author();
  }

  // Lấy blog author
  get_blog_author() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let author = params['author'];
        this.get_blog_by_author(author);
      }
    )
  }

  // Lấy blog theo author
  get_blog_by_author(author: string) {
    this.blogService.get_blog_by_query('author', author).subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }
}
