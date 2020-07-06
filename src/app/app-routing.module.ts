import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { CreatecourseComponent } from './components/createcourse/createcourse.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: "",  component: HomeComponent, pathMatch: "full"},
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'createcourse',
    component: CreatecourseComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
