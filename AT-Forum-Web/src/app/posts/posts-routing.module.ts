import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCategoryComponent} from './category/create-category/create-category.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent},
  { path: 'create-category', component: CreateCategoryComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
