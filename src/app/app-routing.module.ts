import { ChitietComponent } from './product/chitiet/chitiet.component';
import { MainComponent } from './main/main.component';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { combineAll } from 'rxjs-compat/operator/combineAll';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './customer/login/login.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },

   {
     path: '',
     component: MainComponent,
   },

   {
     path: 'home',
     component: MainComponent,
   },


   {
     path: 'chitiet/:id',
     component: ChitietComponent,
   },
   {
     path: 'login',
     component: LoginComponent,
   },
   {
    path: '**',
    component: NotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
