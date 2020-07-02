import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../blog.service';

import { BlogModel, BlogResponse } from '../../_models/blog.model';

declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blog: BlogModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.get_blog_slug();
  }

  // Lấy slug của blog
  get_blog_slug() {
    this.activatedRoute.params.subscribe(
      params => {
        let blog_slug = params['slug'];
        this.get_blog(blog_slug);
      }
    )
  }
  // Lấy nội dung blog theo slug
  get_blog(blog_slug: string) {
    this.blogService.get_blog(blog_slug).subscribe(
      (res: BlogResponse) => {
        this.blog = res.article;
      },
      err => {
        if (err.error.errors.article == "An article with this slug does not exist.") {
          this.router.navigate(['/404']);
        }
      }
    )
  }

  // Like bài viết
  like_clicked() {
    $(".heart").toggleClass("is-active");
  }
}
