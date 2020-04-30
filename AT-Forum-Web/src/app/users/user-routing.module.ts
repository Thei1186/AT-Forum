import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'create-user', component: CreateUserComponent},
  { path: 'admin', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
