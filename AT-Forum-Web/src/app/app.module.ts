import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgxsModule} from '@ngxs/store';
import {environment, firebaseConfig} from '../environments/environment';
import {AuthState} from './auth/shared/auth.state';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {LoginComponent} from './auth/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {UserState} from './users/shared/user.state';
import { HomeComponent } from './home/home.component';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {CategoryState} from './posts/category/shared/category.state';
import {TopicState} from './posts/topic/shared/topic.state';
import {MatMenuModule} from '@angular/material/menu';
import {CommentState} from './posts/comment/shared/comment.state';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([AuthState, UserState, CategoryState, TopicState, CommentState]
            , {developmentMode: !environment.production}),
        NgxsLoggerPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({key: ['auth', 'user', 'category', 'topic', 'comment']}),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
