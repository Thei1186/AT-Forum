import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {CreateUserComponent} from './create-user/create-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [
    ProfileComponent,
    CreateUserComponent,
    AdminPageComponent,
    EditUserComponent,
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class UserModule { }
