import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {HomeComponent} from "../components/home/home.component";
import {RegisterComponent} from "../components/register/register.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";

const appRoutes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class RoutingModule{}
