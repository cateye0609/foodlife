import { Component, OnInit } from '@angular/core';
import { API } from '../../_api/apiURL';
import { BlogModel } from '../../_models/blog.model';
import { CommonService } from '../../_services/common.service';
import { BlogService } from '../blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ImageModel } from '../../_models/image.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  options: Object = {
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
    imageUploadParam: 'image',
    // Set the image upload URL.
    imageUploadURL: API.UPLOAD_IMAGE,
    // Additional upload params.
    imageUploadParams: { type: 'post_image' },
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
    private router: Router
  ) {
    this.blog = {} as BlogModel;
  }

  ngOnInit(): void { }

  onSubmit(data: BlogModel) {
    if (this.blog_image_file) {
      this.commonService.upload_image(this.blog_image_file, 'blog image').subscribe(
        (res: ImageModel) => {
          this.blog.image = `${environment.BASE_URL}${res.link}`;
        },
        err => { },
        () => {
          this.create_blog(data);
        }
      )
    }
  }

  create_blog(data: BlogModel) {
    let body = `title=${data.title}&description=${data.description}&image=${this.blog.image}&body=${encodeURIComponent(this.blog.body)}`;
    this.blogService.create_blog(body).subscribe(
      (res) => {
        this.toastr.success("Tạo bài viết mới thành công!");
      }
    )
  }

  image_change(event: any) {
    this.blog_image_file = event.target.files[0];
  }
}
