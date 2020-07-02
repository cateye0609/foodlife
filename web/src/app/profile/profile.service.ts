import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { CommonService } from '../_services/common.service';

@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private router: Router,
    ) { }

    // Lấy thông tin user
    get_userinfo() {
        let username = localStorage.getItem('username');

        return this.http.get(API.PROFILE + username)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy thông tin user!"))
            );
    }

    // Sửa thông tin user
    update_userinfo(body: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-type': 'application/x-www-form-urlencoded',
        });

        return this.http.put(API.USER, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi cập nhật user!"))
            );
    }
}