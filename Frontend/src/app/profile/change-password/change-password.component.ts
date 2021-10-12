import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserResponseModel, UserModel } from '../../_models/user.model';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userinfo: UserModel;

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.get_userinfo();
  }

  get_userinfo() {
    this.profileService.get_userinfo(localStorage.getItem('username')).subscribe(
      (res: UserResponseModel) => {
        this.userinfo = res.profile;
      }
    )
  }

  onSubmit(data: {
    oldpass: string;
    newpass: string;
  }) {
    let body = `email=${this.userinfo.email}&old_password=${data.oldpass}&new_password=${data.newpass}`;
    this.profileService.change_password(body).subscribe(
      res => {
        this.toastr.success("Đổi password thành công!");
        this.router.navigate(['/user/profile'])
      }
    )
  }
}
