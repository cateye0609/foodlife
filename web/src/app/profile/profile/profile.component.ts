import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserModel, UserResponseModel } from '../../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userinfo: UserModel;

  constructor(
    private profileService: ProfileService
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
}
