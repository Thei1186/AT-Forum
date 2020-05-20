import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {AdminGuard} from '../shared/guards/admin.guard';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserComponent},
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
