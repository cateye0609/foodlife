import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { CommonService } from '../_services/common.service';
import { AuthenticationService } from '../auth/auth.service';

import { BlogModel, BlogResponse, BlogsListResponse, BlogCommentModel, TopBlogModel, TagModel } from '../_models/blog.model';

declare interface CommentResponseModel {
    comment: {
        body: string;
    }
}

@Injectable()
export class BlogService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private authService: AuthenticationService
    ) { }

    // Thêm bài viết mới
    create_blog(body: any) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
        });
        return this.http.post(API.ARTICLES, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc tạo bài viết!"))
            );
    }

    // Sửa bài viết
    edit_blog(body: any, slug: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
        });

        return this.http.put(`${API.ARTICLES}/${slug}`, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc sửa bài viết!"))
            );
    }

    // Lấy tất cả bài viết
    get_all_blogs() {
        return this.http.get(API.ARTICLES)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách bài viết!"))
            );
    }

    // Lấy 1 bài viết theo slug
    get_blog(slug: string) {
        if (this.authService.is_loggedIn()) {
            let headers = new HttpHeaders({
                'Authorization': `Token ${localStorage.getItem('token')}`,
            });
            return this.http.get(`${API.ARTICLES}/${slug}`, { headers: headers })
                .pipe(
                    catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy bài viết!"))
                );
        } else {
            return this.http.get(`${API.ARTICLES}/${slug}`)
                .pipe(
                    catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy bài viết!"))
                );
        }
    }

    // Lấy blog theo query
    get_blog_by_query(query: string, value: string) {
        return this.http.get<BlogsListResponse>(`${API.ARTICLES}?${query}=${value}`)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách bài viết!"))
            );
    }
    search_by_title_tag(title: string, tag: string) {
        return this.http.get<BlogsListResponse>(`${API.ARTICLES}?search=${title}&tag=${tag}`)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách bài viết!"))
            );
    }

    // Lấy blog theo các followed author
    get_blogs_newfeed() {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
        });
        return this.http.get(`${API.ARTICLES}/feed/`, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách bài viết!"))
            );
    }

    // Lấy top blog
    get_top_blogs() {
        return this.http.get<TopBlogModel>(API.TOP_ARTICLES)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách top bài viết!"))
            );
    }

    // Like blog
    like_blog(slug: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
        });
        return this.http.post(`${API.ARTICLES}/${slug}/favorite`, null, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi like bài viết!"))
            );
    }

    // Unlike blog
    unlike_blog(slug: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
        });
        return this.http.delete(`${API.ARTICLES}/${slug}/favorite`, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi unlike bài viết!"))
            );
    }

    // Lấy comment của blog
    get_blog_comment(slug: string) {
        return this.http.get<BlogCommentModel>(`${API.ARTICLES}/${slug}/comments`)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi lấy comment bài viết!"))
            );
    }

    // Comment bài viết
    comment_blog(slug: string, comment: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
        });
        let body: CommentResponseModel = {
            comment: {
                body: comment
            }
        };
        return this.http.post<CommentResponseModel>(`${API.ARTICLES}/${slug}/comments`, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi khi comment bài viết!"))
            );
    }

    // Xóa comment
    delete_comment(slug: string, comment_id: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
        });
        return this.http.delete<CommentResponseModel>(`${API.ARTICLES}/${slug}/comments/${comment_id}`, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi khi xóa comment!"))
            );
    }

    // Lấy danh sách tag
    get_tags() {
        return this.http.get<TagModel>(API.TAGS)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi lấy danh sách tag!"))
            );
    }
}