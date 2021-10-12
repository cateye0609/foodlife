import { Component, OnInit, Input } from '@angular/core';

import { ProfileService } from '../profile.service';
import { UserModel, UsersListResponseModel } from '../../_models/user.model';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input('data') users_list: UserModel[] = [];
  page: number = 1;
  loaded = false;

  constructor(
    private profileService: ProfileService
  ) {
    this.users_list = [];
  }

  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    this.get_users_list();
  }

  // Lấy danh sách tất cả user
  get_users_list() {
    this.profileService.get_all_users().subscribe(
      (res: UsersListResponseModel) => {
        this.users_list = res.profiles;
        this.loaded = true;
      }
    )
  }
}
