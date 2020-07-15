import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../auth.service';
// Social login
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.authService.is_loggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  onLogin(data: {
    email: string,
    password: string
  }) {
    this.authService.login(data.email, data.password);
  }

  // Đăng nhập facebook
  signInFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userdata) => {
        this.authService.social_login('facebook', userdata.authToken).subscribe(
          (res) => {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('token_type', res.token_type);
            this.authService.get_userFbInfo().subscribe(
              (res) => {
                localStorage.setItem('token', res.user.token);
                localStorage.setItem('username', res.user.username);
                console.log(res);
                this.toastr.success("Đăng nhập thành công!");
                localStorage.removeItem('access_token');
                this.router.navigate(['/home']);
              }
            )
          }
        );
      }
    );
  }

  // Đăng nhập google
  signInGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userdata) => {
        this.authService.social_login('google-oauth2', userdata.authToken).subscribe(
          (res) => {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('token_type', res.token_type);
            this.authService.get_userFbInfo().subscribe(
              (res) => {
                localStorage.setItem('token', res.user.token);
                localStorage.setItem('username', res.user.username);
                console.log(res);
                this.toastr.success("Đăng nhập thành công!");
                localStorage.removeItem('access_token');
                this.router.navigate(['/home']);
              }
            )
          }
        );
      }
    );
  }
}
