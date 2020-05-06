import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { TopicComponent } from './topic/topic.component';
import { CommentComponent } from './comment/comment.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CategoryComponent } from './category/category.component';
import {MatListModule} from "@angular/material/list";
import { EditCategoryComponent } from './category/edit-category/edit-category.component';



@NgModule({
  declarations: [CreateCategoryComponent, TopicComponent, CommentComponent, CreateTopicComponent, CategoryComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ]
})
export class PostsModule { }
