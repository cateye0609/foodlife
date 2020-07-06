import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../auth/auth.service';
import { BlogService } from '../../blog/blog.service';
import { BlogModel, BlogsListResponse, TopBlogModel } from '../../_models/blog.model';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  is_loggedIn = this.authService.is_loggedIn();
  blogs_list: BlogModel[];
  top_like_blogs: BlogModel[];
  top_comment_blogs: BlogModel[];

  constructor(
    private authService: AuthenticationService,
    private blogService: BlogService
  ) {
    this.blogs_list = [];
    this.top_like_blogs = [];
    this.top_comment_blogs = [];
  }

  ngOnInit(): void {
    $(".mobile-menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });

    this.loaddata();
  }

  loaddata() {
    this.get_blogs_list();
    this.get_top_blogs();
  }

  // Lấy danh sách blog
  get_blogs_list() {
    this.blogService.get_all_blogs().subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }

  // Lấy danh sách top bài viết
  get_top_blogs() {
    this.blogService.get_top_blogs().subscribe(
      (res: TopBlogModel) => {
        this.top_like_blogs = res.article.top_like;
        this.top_comment_blogs = res.article.top_comment;
      }
    )
  }

  // Logout
  logout() {
    this.authService.logout()
  }
}
