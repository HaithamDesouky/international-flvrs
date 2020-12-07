import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'mg-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
})
export class ThankyouComponent implements OnInit {
  message: String;
  orderId: Number;
  products;
  cartTotal;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCart: ShoppingCartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {
      message: String;
      products: any[];
      orderId: Number;
      total: Number;
    };

    this.message = state.message;
    this.orderId = state.orderId;
    this.products = state.products[0];
    this.cartTotal = state.total;
  }

  ngOnInit() {}
}
