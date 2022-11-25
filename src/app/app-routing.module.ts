import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentordersComponent } from './currentorders/currentorders.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'orders',component:OrdersComponent},
  {path:'corders',component:CurrentordersComponent},
  {path:'register',component:RegisterComponent,children:[
    {path:"signin",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:'',redirectTo:"/register/signin",pathMatch:"full"}
  ]},
  {path:'',redirectTo:"/register/signin",pathMatch:"full"},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
