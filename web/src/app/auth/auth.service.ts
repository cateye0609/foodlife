import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { API } from '../_api/apiURL';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService } from "angularx-social-login";

import { ClientAuth, SocialAuthResponse, SocialUserResponse } from '../_models/socialAuth.model';
import { LoginModel, RegisterModel } from '../_models/auth.model';
import { CommonService } from '../_services/common.service';

interface LoginResponseModel {
    user: LoginModel;
}

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private commonService: CommonService,
        private socialAuthService: SocialAuthService
    ) { }

    // Login
    login(email: string, password: string) {
        const body = `email=${email}&password=${password}`;

        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded'
        });
        this.http.post(API.LOGIN, body, { headers }).subscribe(
            res => {
                const response = res as LoginResponseModel;
                localStorage.setItem('token', response.user.token);
                localStorage.setItem('username', response.user.username);
                this.toastr.success("Đăng nhập thành công!");
                this.router.navigate(['/home']);
            },
            err => {
                this.toastr.error("Lỗi trong lúc đăng nhập!");
                console.error(err.errors.error);
            }
        );
    }

    // Register
    register(body: string) {
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded'
        });
        this.http.post(API.REGISTER, body, { headers }).subscribe(
            res => {
                this.toastr.success("Đăng ký thành công!");
                this.router.navigate(['/user/login']);
            },
            err => {
                this.toastr.error("Có lỗi trong quá trình đăng ký!");
                console.log(err.errors.error);
            }
        );
    }

    // Social login
    social_login(type: string, token: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let body = `grant_type=convert_token&client_id=${ClientAuth.client_id}&backend=${type}&client_secret=${ClientAuth.client_secret}&token=${token}`;
        return this.http.post<SocialAuthResponse>(API.SOCIALS, body, { headers: headers })
            .pipe(
                catchError(err => this.commonService.handleError(err, "Lỗi trong lúc đăng nhập!"))
            );
    }

    // Lấy thông tin user facebook từ API
    get_userFbInfo() {
        if (!!localStorage.getItem('access_token')) {
            let headers = new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            });
            return this.http.get<SocialUserResponse>(API.USER, { headers: headers })
                .pipe(
                    catchError(err => this.commonService.handleError(err, "Lỗi trong lúc lấy thông tin user!"))
                );
        }
    }

    // Logout
    logout() {
        if (localStorage.getItem('token_type') == 'Bearer') {
            this.signOutFB();
        }
        localStorage.clear();
        this.toastr.success("Đăng xuất thành công!");
        this.router.navigate(['/user/login']);
    }

    // Đăng xuất facebook
    signOutFB(): void {
        this.socialAuthService.signOut();
    }

    // Kiểm tra có đăng nhập không
    is_loggedIn() {
        return !!localStorage.getItem('token');
    }
}
