import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  sortSelected = '?sort=name';
  sortOptions = [
    { name: 'Alphabetical', value: '?sort=name' },
    { name: 'Price: Low to High', value: '?sort=priceasc' },
    { name: 'Price High to Low', value: '?sort=pricedesc' },
  ];

  constructor(
    private productService: ProductService,
    private shopping_cart: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((resp) => {
      this.products = resp;
    });
  }

  getSingleProduct(id: Number) {
    return this.products.find((prod) => prod.id === id);
  }

  getSingleCategory(category: String) {
    return this.products.filter((prod) => prod.category === category);
  }

  onSortSelected(event: any) {
    let sort = event.target.value;
    this.sortSelected = sort;
    this.productService
      .getSortedProducts(sort)
      .subscribe((products) => (this.products = products));
  }
}
