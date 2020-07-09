import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../blog.service';
import { BlogsListResponse, BlogModel } from '../../_models/blog.model';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css']
})
export class BlogSearchComponent implements OnInit {
  @Input('data') blogs_list: BlogModel[] = [];
  page: number = 1;

  keyword: string;
  tag: string;

  found = false;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_search_keyword();
  }

  // Lấy search keyword
  get_search_keyword() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.keyword = params['keyword'];
        this.tag = params['tag'];
        if (this.tag != '') {
          this.get_blogs_by_keyword_tag(this.keyword, this.tag);
        } else {
          this.get_blogs_by_keyword(this.keyword);
        }
      }
    )
  }

  // Lấy danh sách bài viết theo keyword
  get_blogs_by_keyword(keyword: string) {
    this.blogService.get_blog_by_query('search', keyword).subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
        this.found = true;
      }
    )
  }

  // Lấy danh sách bài viết theo keyword và tag
  get_blogs_by_keyword_tag(keyword: string, tag: string) {
    this.blogService.search_by_title_tag(keyword, tag).subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
        this.found = true;
      }
    )
  }
}
