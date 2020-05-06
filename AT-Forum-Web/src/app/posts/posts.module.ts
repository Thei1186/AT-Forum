import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { CategoryComponent } from './category/category.component';
import { TopicComponent } from './topic/topic.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [CategoryComponent, TopicComponent, CommentComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
