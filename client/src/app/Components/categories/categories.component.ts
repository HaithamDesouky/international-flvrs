import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  products: Product[] = [];
  NewsLetterForm!: FormGroup;
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private routerR: Router,
    private shopping_cart: ShoppingCartService
  ) {
    this.routerR.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.category = this.route.snapshot.params.category;
  }

  ngOnInit(): void {
    this.getCategoryProducts(this.category);
  }

  getCategoryProducts(category: string) {
    return this.productService
      .getCategoryProducts(category)
      .subscribe((response) => {
        (this.products = response), console.log(response);
      });
  }

  getSingleProduct(id: Number) {
    // return this.products.find((prod) => prod.id === id);
  }

  addToCart(p: Product) {
    this.shopping_cart.addProduct(p);

    // this.updateCart();
    this.shopping_cart.getTotal();
  }
}

//  this.api.getAllProducts().subscribe((resp) => {
//    this.products = resp.filter(
//      (item: any) => item.category.toLowerCase() === this.filter.toLowerCase()
//    );
//  });
