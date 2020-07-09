import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { environment } from '../../environments/environment';
import { CommonService } from '../_services/common.service';
import { AuthenticationService } from '../auth/auth.service';

import { UsersListResponseModel } from '../_models/user.model';
@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private authService: AuthenticationService
    ) { }

    // Lấy danh sách tất cả user
    get_all_users() {
        return this.http.get<UsersListResponseModel>(`${environment.API_URL}/profiles`)
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi lấy danh sách user!"))
            );
    }

    // Lấy thông tin user
    get_userinfo(username: string) {
        if (this.authService.is_loggedIn()) {
            let headers = new HttpHeaders({
                'Authorization': `Token ${localStorage.getItem('token')}`,
            });
            return this.http.get(API.PROFILE + username, { headers: headers })
                .pipe(
                    catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy thông tin user!"))
                );
        }
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

    // Follow user
    follow_user(username: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-type': 'application/x-www-form-urlencoded',
        });

        return this.http.post(`${API.PROFILE}${username}/follow`, null, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi follow user!"))
            );
    }

    // Unfollow user
    unfollow_user(username: string) {
        let headers = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Content-type': 'application/x-www-form-urlencoded',
        });

        return this.http.delete(`${API.PROFILE}${username}/follow`, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi follow user!"))
            );
    }
}