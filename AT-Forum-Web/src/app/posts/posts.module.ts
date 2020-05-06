import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { CommentComponent } from './comment/comment.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';


@NgModule({
  declarations: [CategoryComponent, TopicComponent, CommentComponent, CreateTopicComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
