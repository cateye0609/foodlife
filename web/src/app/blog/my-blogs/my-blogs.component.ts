import { Component, OnInit } from '@angular/core';

import { BlogService } from '../blog.service';
import { BlogsListResponse, BlogModel } from '../../_models/blog.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  username = localStorage.getItem('username');
  my_blogs: BlogModel[];
  loaded = false;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService
  ) {
    this.my_blogs = [];
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_my_blogs();
  }

  // Lấy blog của mình
  get_my_blogs() {
    this.blogService.get_blog_by_query('author', this.username).subscribe(
      (res: BlogsListResponse) => {
        this.my_blogs = res.articles;
        this.loaded = true;
      }
    )
  }

  // Xóa blog
  delete_blog(blog: BlogModel) {
    if (confirm(`Xóa blog này?\n${blog.title}`)) {
      this.blogService.delete_blog(blog.slug).subscribe(
        res => {
          this.toastr.success("Đã xóa blog!");
          this.loaddata();
        }
      )
    }
  }
}
