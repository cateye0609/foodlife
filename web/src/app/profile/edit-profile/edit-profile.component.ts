import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel, UserResponseModel } from '../../_models/user.model';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';

declare interface EditUserModel {
  username: string;
  bio?: string;
  gender: string;
  birthday: string;
  phone?: number;
  email: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userinfo: UserModel;

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userinfo = {} as UserModel;
  }

  ngOnInit(): void {
    this.get_userinfo();
  }

  // Lấy thông tin user
  get_userinfo() {
    this.profileService.get_userinfo().subscribe(
      (res: UserResponseModel) => {
        this.userinfo = res.profile;
      }
    );
  }

  // Cập nhật user info
  onSubmit(data: EditUserModel) {
    let body = `username=${data.username}&bio=${data.bio}&
                gender=${data.gender}&birthday=${data.birthday}&
                email=${data.email}`;
    console.log(data);
    this.profileService.update_userinfo(body).subscribe(
      res => {
        this.toastr.success("Cập nhật profile thành công!");
        this.router.navigate(['/user/profile']);
      }
    );
  }
}
