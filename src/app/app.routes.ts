import { Routes } from '@angular/router';
import { MainLayout } from '../layouts/main-layout/main-layout';
import { AdminLayout } from '../layouts/admin-layout/admin-layout';
import { Home } from '../pages/home/home';

export const routes: Routes = [

    {
  path: '',
  component: MainLayout,
  children: [
    { path: '', component: Home },
    // { path: 'products', component: ProductsComponent },
    // { path: 'cart', component: CartComponent },
  ]
},
{
  path: 'admin',
  component: AdminLayout,
  children: [
    // { path: '', component: AdminDashboardComponent },
    // { path: 'products', component: AdminProductsComponent },
  ]
}

];
