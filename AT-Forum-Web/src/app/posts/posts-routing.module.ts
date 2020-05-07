import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {CreateTopicComponent} from './topic/create-topic/create-topic.component';
import {CategoryComponent} from './category/category.component';
import {EditCategoryComponent} from './category/edit-category/edit-category.component';
import {CategoryDetailsComponent} from './category/category-details/category-details.component';
import {TopicDetailsComponent} from './topic/topic-details/topic-details.component';
import {CreateCommentComponent} from './comment/create-comment/create-comment.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent},
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'edit-category/:id', component: EditCategoryComponent},
  { path: 'create-topic/:id', component: CreateTopicComponent},
  { path: 'category-details/:id', component: CategoryDetailsComponent},
  { path: 'topic-details/:id', component: TopicDetailsComponent},
  { path: 'create-comment/:id', component: CreateCommentComponent},
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
