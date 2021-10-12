import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { ProfileService } from './profile.service';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, UserinfoComponent, UsersListComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
