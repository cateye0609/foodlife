import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { API } from '../_api/apiURL';
import { ToastrService } from 'ngx-toastr';

import { LoginModel, RegisterModel } from '../_models/auth.model';

interface LoginResponseModel {
    user: LoginModel;
}

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService
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

    // Logout
    logout() {
        localStorage.clear();
        this.toastr.success("Đăng xuất thành công!");
        this.router.navigate(['/user/login']);
    }

    // Kiểm tra có đăng nhập không
    is_loggedIn() {
        return !!localStorage.getItem('token');
    }
}
