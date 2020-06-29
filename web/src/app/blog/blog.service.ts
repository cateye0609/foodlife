import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { CommonService } from '../_services/common.service';

@Injectable()
export class BlogService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
    ) { }

    // Lấy tất cả bài viết
    get_all_posts() {
        this.http.get(API.ARTICLES)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy danh sách bài viết!"))
            );
    }

    // Lấy 1 bài viết theo slug
    get_post(slug: string) {
        this.http.get(`${API.ARTICLES}/${slug}`)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy bài viết!"))
            );
    }
}