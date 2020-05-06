import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { CommentComponent } from './comment/comment.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [CategoryComponent, TopicComponent, CommentComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PostsModule { }
