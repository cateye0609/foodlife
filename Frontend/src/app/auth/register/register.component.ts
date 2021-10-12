import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  onRegister(data: {
    username: string,
    email: string,
    password: string
  }) {
    const body = `username=${data.username}&email=${data.email}&password=${data.password}`;
    this.authService.register(body);
  }
}
