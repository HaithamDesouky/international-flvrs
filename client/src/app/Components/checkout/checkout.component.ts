import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'mg-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartData: any;
  cartTotal: number;
  showSpinner: Boolean;
  checkoutForm!: FormGroup;
  constructor(
    private shoppingCart: ShoppingCartService,
    public orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.cartTotal = 0;
    this.cartData = [];
    this.showSpinner = false;
  }

  ngOnInit() {
    this.cartData = this.getCartContent();
    this.cartTotal = this.shoppingCart.getTotal();
    this.createCheckoutForm();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      city: [''],
      country: [''],
      zipcode: ['', [Validators.required]],
      orderNotes: [''],
    });
  }

  getCartContent() {
    return this.shoppingCart.get_shopping_cart_items();
  }

  onSubmit() {
    const basket = this.cartData;
    let total = this.shoppingCart.getTotal();

    const order = {
      products: JSON.stringify(basket),
      ...this.checkoutForm.value,
      total: total,
    };

    this.spinner.show();

    let execute = this.orderService.createOrder(order);
  }
}
