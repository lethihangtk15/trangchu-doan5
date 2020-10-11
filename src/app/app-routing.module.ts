import { LoginComponent } from './customer/login/login.component';
import { ChitietComponent } from './product/chitiet/chitiet.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  // {
  //   path: 'customer',
  //   loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
  // },
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
    path: 'chitiet',
    component: ChitietComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
