import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() individualProduct!: Product;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  selectProduct(id: Number) {}

  addToCart(p: any) {
    this.shoppingCartService.addProduct(p);
    this.shoppingCartService.getTotal();
  }
}
