import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent },
            { path: 'edit', component: EditProfileComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
