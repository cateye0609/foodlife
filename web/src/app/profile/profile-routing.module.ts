import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_guard/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'edit', component: EditProfileComponent, canActivate: [AuthGuard] },
            { path: 'edit/password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: 'users',
        children: [
            { path: ':username', component: UserinfoComponent }
        ]
    },
    { path: 'users-list', component: UsersListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
