import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import { API } from '../../_api/apiURL';

import { BlogModel, BlogResponse } from '../../_models/blog.model';
import { ImageModel } from '../../_models/image.model';

import { CommonService } from '../../_services/common.service';
import { BlogService } from '../blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  options: Object = {
    language: 'vi',
    pastePlain: true,
    placeholderText: 'Edit your post here!',
    toolbarButtons: [
      ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly',
        'insertTable', 'insertLink', 'quote', 'html'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['undo', 'redo']],
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      '\'Courier New\',Courier,monospace': 'Courier New',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      '\'Lucida Console\',Monaco,monospace': 'Lucida Console',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      '\'Times New Roman\',Times,serif': 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana',
    },
    // // disable image upload (use hotlinking)
    // imageUpload: false,
    // Set the image upload parameter.
    requestHeaders: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
    },
    imageUploadParam: 'link',
    // Set the image upload URL.
    imageUploadURL: API.UPLOAD_IMAGE,
    // Additional upload params.
    imageUploadParams: { description: 'blog_image' },
    // Set request type.
    imageUploadMethod: 'POST',
    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  }

  blog: BlogModel;
  blog_image_file: any;

  constructor(
    private commonService: CommonService,
    private blogService: BlogService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.blog = {} as BlogModel;
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_blog_slug();
  }

  // Lấy blog slug cần sửa
  get_blog_slug() {
    this.activatedRoute.params.subscribe(params => {
      let slug = params['slug'];
      this.get_blog(slug);
    })
  }

  // Lấy blog cần sửa
  get_blog(slug: string) {
    this.blogService.get_blog(slug).subscribe(
      (res: BlogResponse) => {
        this.blog = res.article;
      }
    )
  }

  onSubmit(data: BlogModel) {
    if (this.blog_image_file) {
      this.commonService.upload_image(this.blog_image_file, 'blog feature').subscribe(
        (res: ImageModel) => {
          this.blog.image = res.link;
        },
        err => { },
        () => {
          this.edit_blog(data);
        }
      )
    } else {
      this.edit_blog(data);
    }
  }

  edit_blog(data: BlogModel) {
    let body = {
      article: {
        "title": data.title,
        "description": data.description,
        "image": this.blog.image,
        "body": this.blog.body
      }
    };
    this.blogService.edit_blog(body, this.blog.slug).subscribe(
      (res: BlogResponse) => {
        this.toastr.success("Sửa bài viết thành công!");
        this.router.navigate(['/blog', res.article.slug]);
      }
    )
  }

  image_change(event: any) {
    this.blog_image_file = event.target.files[0];
  }
}
