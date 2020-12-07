import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  SearchForm!: FormGroup;
  cartTotal: number;
  cartData: Product[];
  searchValue: string = '';

  constructor(
    public shoppingCart: ShoppingCartService,
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cartTotal = 0;
    this.cartData = [];
    this.SearchForm = this.fb.group({
      searchValue: '',
      category: '',
    });
  }

  ngOnInit(): void {
    this.getCartContent();
    this.cartTotal = this.shoppingCart.getTotal();
    this.cartData = this.getCartContent();
  }

  onSubmit(): void {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     value: this.SearchForm.value.searchValue,
    //     category: this.SearchForm.value.category,
    //   },
    // };

    this.router.navigate([
      `/search/results`,
      {
        term: this.SearchForm.value.searchValue,
        category: this.SearchForm.value.category,
      },
    ]);
  }

  signOut() {
    this.auth.logOut();
  }

  getCartLength() {
    this.cartData = this.getCartContent();
    return this.shoppingCart.getCartLength();
  }

  getCartContent() {
    this.cartTotal = this.shoppingCart.getTotal();

    return this.shoppingCart.get_shopping_cart_items();
  }
}
