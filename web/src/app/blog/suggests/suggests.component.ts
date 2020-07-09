import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogsListResponse, BlogModel } from '../../_models/blog.model';

@Component({
  selector: 'app-suggests',
  templateUrl: './suggests.component.html',
  styleUrls: ['./suggests.component.css']
})
export class SuggestsComponent implements OnInit {
  @Input() public author: string;

  same_blogs: BlogModel[];
  constructor(
    private blogService: BlogService
  ) {
    this.same_blogs = [];
  }

  ngOnInit(): void {
    this.get_author_blogs();
  }

  // Lấy blog của cùng tác giả
  get_author_blogs() {
    this.blogService.get_blog_by_query('author', this.author).subscribe(
      (res: BlogsListResponse) => {
        this.same_blogs = res.articles;
      }
    )
  }
}
