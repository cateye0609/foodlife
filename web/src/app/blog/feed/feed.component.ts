import { Component, OnInit, Input } from '@angular/core';

import { BlogModel, BlogsListResponse } from '../../_models/blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input('data') blogs_list: BlogModel[] = [];
  page: number = 1;

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_followed_blogs();
  }

  // Lấy danh sách bài viết từ các tác giả đang theo dõi
  get_followed_blogs() {
    this.blogService.get_blogs_newfeed().subscribe(
      (res: BlogsListResponse) => {
        this.blogs_list = res.articles;
      }
    )
  }
}
