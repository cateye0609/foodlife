import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserModel, UserResponseModel } from '../../_models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  current_username = localStorage.getItem('username');

  userinfo: UserModel;
  isFollowed = false;

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_username();
  }

  // Lấy username của user
  get_username() {
    this.activatedRoute.params.subscribe(params => {
      let username = params['username'];
      this.get_user_info(username);
    });
  }

  // Lấy thông tin user 
  get_user_info(username: string) {
    this.profileService.get_userinfo(username).subscribe(
      (res: UserResponseModel) => {
        this.userinfo = res.profile;
      }
    );
  }

  // Click vào nút theo dõi
  follow_clicked() {
    if (this.userinfo.following) {
      this.profileService.unfollow_user(this.userinfo.username).subscribe(
        res => {
          this.loaddata();
        }
      );
    } else {
      this.profileService.follow_user(this.userinfo.username).subscribe(
        res => {
          this.loaddata();
        }
      );
    }
  }
}
