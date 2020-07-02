import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../auth/auth.service';
import { BlogService } from '../../blog/blog.service';
import { BlogModel, BlogsListResponse } from '../../_models/blog.model';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  is_loggedIn = this.authService.is_loggedIn();
  blogs_list: BlogModel[];

  constructor(
    private authService: AuthenticationService,
    private blogService: BlogService
  ) {
    this.blogs_list = [];
    this.get_blogs_list();
  }

  ngOnInit(): void {
    $(".mobile-menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }

  // Lấy danh sách blog
  get_blogs_list() {
    this.blogService.get_all_blogs().subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }

  logout() {
    this.authService.logout()
  }
}
