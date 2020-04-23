import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {AuthState} from './auth/shared/auth.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {LoginComponent} from './auth/login/login.component';
import { LoginComponent} from './auth/login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {  MatCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AuthState]
      , { developmentMode: !environment.production }),
    NgxsLoggerPluginModule
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
