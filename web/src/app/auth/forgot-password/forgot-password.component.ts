import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  //
  onSubmit(data: {
    email: string;
  }) {
    this.authService.reset_password(data.email).subscribe(
      (res) => {
        alert(res);
      }
    );
  }
}
