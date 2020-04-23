import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {AuthState} from './auth/shared/auth.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AuthState]
      , {developmentMode: !environment.production}),
    NgxsLoggerPluginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
