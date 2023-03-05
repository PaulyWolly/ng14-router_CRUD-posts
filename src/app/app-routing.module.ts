import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ApplicationComponent } from './components/application/application.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InitComponent } from './components/init/init.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
