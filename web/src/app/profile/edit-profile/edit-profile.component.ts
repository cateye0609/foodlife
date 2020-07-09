import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel, UserResponseModel } from '../../_models/user.model';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../_services/common.service';

import { ImageModel } from '../../_models/image.model';
import { environment } from '../../../environments/environment';
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
  avatar_url: string;
  avatarFile: any;

  constructor(
    private profileService: ProfileService,
    private commonService: CommonService,
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
    this.profileService.get_userinfo(localStorage.getItem('username')).subscribe(
      (res: UserResponseModel) => {
        this.userinfo = res.profile;
        this.avatar_url = this.userinfo.avatar;
      }
    );
  }

  // Cập nhật user info
  onSubmit(data: EditUserModel) {
    if (this.avatarFile) {
      this.commonService.upload_image(this.avatarFile, 'avatar').subscribe(
        (res: ImageModel) => {
          this.avatar_url = `${environment.BASE_URL}${res.link}`;
          this.userinfo.avatar = `${environment.BASE_URL}${res.link}`;
        },
        err => { },
        () => {
          this.userinfo_update(this.userinfo);
        }
      )
    } else {
      this.userinfo_update(this.userinfo);
    }
  }

  // Cập nhật userinfo
  userinfo_update(data: UserModel) {
    let body = `username=${data.username}&bio=${data.bio}&gender=${data.gender}&birthday=${data.birthday}&email=${data.email}&avatar=${data.avatar}`;
    this.profileService.update_userinfo(body).subscribe(
      res => {
        this.toastr.success("Cập nhật profile thành công!");
        this.router.navigate(['/user/profile']);
      }
    );
  }

  // Avart thay đổi
  avt_changed(event: any) {
    this.avatarFile = event.target.files[0];
  }
}
