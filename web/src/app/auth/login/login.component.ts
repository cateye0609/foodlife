import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
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
}
