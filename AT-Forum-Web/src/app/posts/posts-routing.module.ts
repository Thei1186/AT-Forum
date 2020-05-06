import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {CreateTopicComponent} from './topic/create-topic/create-topic.component';

const routes: Routes = [
  { path: 'create-category', component: CreateCategoryComponent},
  { path: 'create-topic', component: CreateTopicComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
