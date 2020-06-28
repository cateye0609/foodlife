import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserModel } from '../../_models/user.model';

interface ProfileModel {
  profile: UserModel;
}

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
    this.profileService.get_userinfo().subscribe(
      res => {
        let response = res as ProfileModel;
        this.userinfo = response.profile;
      }
    )
  }
}
