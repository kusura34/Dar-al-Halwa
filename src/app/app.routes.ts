import { Routes } from '@angular/router';
import { MainLayout } from '../layouts/main-layout/main-layout';
import { AdminLayout } from '../layouts/admin-layout/admin-layout';
import { Home } from '../pages/home/home';
import { Dashboard } from '../pages/admin/dashboard/dashboard';
import { AdminProducts } from '../pages/admin/admin-products/admin-products';
import { ProductList } from '../shared/ui/product-list/product-list';
import { authGuard } from '../core/guards/auth-guard';
import { AdminLoginComponent } from '../pages/admin-login/admin-login';

export const routes: Routes = [

    {
  path: '',
  component: MainLayout,
  children: [
    { path: '', component: Home },
    { path: 'products', component: ProductList },
    // { path: 'cart', component: CartComponent },
  ]
},
{ path: 'login', component: AdminLoginComponent },
{
  path: 'admin',
  component: AdminLayout,
  canActivate: [authGuard],
  children: [
    { path: 'admin', component: Dashboard },
    { path: 'products', component: AdminProducts },
  ]
}
];
