import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { AuthService } from './service/auth.service';
import { authGuard } from './service/auth.guard';
import { ProductsTableComponent } from './products-table/products-table.component';
import { DepartmentTableComponent } from './departments-table/departments-table.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',
   component:HomeComponent,
   canActivate :[authGuard]
  },
  {path:'header',component:HeaderComponent},
  {path:'cart',component:CartComponent, canActivate :[authGuard]},
  {path :'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'products',component:ProductsComponent, canActivate :[authGuard]},
  { path : 'products-table' , component : ProductsTableComponent,canActivate :[authGuard] },
  { path : 'departments-table',component : DepartmentTableComponent,canActivate :[authGuard]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
