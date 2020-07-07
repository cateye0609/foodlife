import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }
    canActivate(): boolean {
        if (this.authService.is_loggedIn()) {
            // Đã đăng nhập nên trả về true
            return true;
        } else {
            // Chưa đăng nhập nên chuyển sang trang đăng nhập
            this.router.navigate(['/user/login']);
            return false;
        }
    }
}