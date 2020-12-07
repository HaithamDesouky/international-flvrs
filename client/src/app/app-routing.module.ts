import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ThankyouComponent } from './Components/thankyou/thankyou.component';
import { HomeComponent } from './Components/home/home.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { SearchComponent } from './Components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: ':category', component: CategoriesComponent },
  { path: 'search/results', component: SearchComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
