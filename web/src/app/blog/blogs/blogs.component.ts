import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../blog.service';
import { ToastrService } from 'ngx-toastr';

import { BlogModel, BlogResponse, BlogCommentModel, CommentModel } from '../../_models/blog.model';

declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  // Ngx-pagination
  @Input('data') comments_list: CommentModel[] = [];
  page: number = 1;

  username = localStorage.getItem('username');

  blog: BlogModel;
  blog_comments: BlogCommentModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_blog_slug();
  }

  // Lấy slug của blog
  get_blog_slug() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let blog_slug = params['slug'];
        this.get_blog(blog_slug);
        this.get_blog_comment(blog_slug);
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

  // Lấy comment của bài viết
  get_blog_comment(blog_slug: string) {
    this.blogService.get_blog_comment(blog_slug).subscribe(
      (res: BlogCommentModel) => {
        this.blog_comments = res;
        this.comments_list = this.blog_comments.comments;
      }
    )
  }

  // Like bài viết
  like_clicked() {
    if (this.blog.favorited == false) {
      this.blogService.like_blog(this.blog.slug).subscribe(
        (res) => {
          $(".heart").className("is-active");
        }
      )
    } else {
      this.blogService.unlike_blog(this.blog.slug).subscribe(
        (res) => {
          $(".heart").removeClass("is-active");
        }
      )
    }
    // Update lại data
    this.loaddata();
  }

  // Comment bài viết
  commentSubmit(data: {
    content: string
  }) {
    this.blogService.comment_blog(this.blog.slug, data.content).subscribe(
      (res) => {
        this.toastr.success("Comment bài viết thành công!");
        $('#commentTextbox').val('');
        this.loaddata();
      }
    )
  }

  // Xóa comment
  delete_comment(comment_id: string) {
    this.blogService.delete_comment(this.blog.slug, comment_id).subscribe(
      (res) => {
        this.toastr.success("Đã xóa comment!");
        this.loaddata();
      }
    )
  }
}
