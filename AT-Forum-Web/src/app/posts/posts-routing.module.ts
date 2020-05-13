import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {CreateTopicComponent} from './topic/create-topic/create-topic.component';
import {CategoryComponent} from './category/category.component';
import {EditCategoryComponent} from './category/edit-category/edit-category.component';
import {CategoryDetailsComponent} from './category/category-details/category-details.component';
import {TopicDetailsComponent} from './topic/topic-details/topic-details.component';
import {CreateCommentComponent} from './comment/create-comment/create-comment.component';
import {EditTopicComponent} from './topic/edit-topic/edit-topic.component';
import {EditCommentComponent} from './comment/edit-comment/edit-comment.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent},
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'edit-category/:id', component: EditCategoryComponent},
  { path: 'create-topic/:id', component: CreateTopicComponent},
  { path: 'edit-topic/:id', component: EditTopicComponent},
  { path: 'category-details/:id', component: CategoryDetailsComponent},
  { path: 'topic-details/:id', component: TopicDetailsComponent},
  { path: 'create-comment/:id', component: CreateCommentComponent},
  { path: 'edit-comment/:id', component: EditCommentComponent},
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
