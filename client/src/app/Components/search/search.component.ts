import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  filter: any;
  searchValues: any;

  constructor(
    private api: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private shopping_cart: ShoppingCartService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.filter = this.route.snapshot.params;
    const navigation = this.router.getCurrentNavigation();
    this.searchValues = navigation?.extras?.state;
  }

  ngOnInit(): void {
    this.updateResults();
  }

  updateResults() {
    let searchVal = this.filter.term;
    let categoryVal = this.filter.category;

    if (searchVal.length && categoryVal.length) {
      this.api.getAllProducts().subscribe((resp) => {
        this.products = resp.filter(
          (item: any) =>
            item.name.toLowerCase().includes(searchVal.toLowerCase()) &&
            item.category === categoryVal
        );
      });
    } else if (searchVal.length && !categoryVal.length) {
      this.api.getAllProducts().subscribe((resp) => {
        this.products = resp.filter((item: any) =>
          item.name.toLowerCase().includes(searchVal.toLowerCase())
        );
      });
    } else if (categoryVal.length && !searchVal.length) {
      this.api.getAllProducts().subscribe((resp) => {
        this.products = resp.filter(
          (item: any) => item.category === categoryVal
        );
      });
    }
  }

  getSingleProduct(id: Number) {
    return this.products.find((prod) => prod.id === id);
  }

  getSingleCategory(category: String) {
    return this.products.filter((prod) => prod.category === category);
  }

  addToCart(p: any) {
    this.shopping_cart.addProduct(p);
    this.updateResults();
    this.shopping_cart.getTotal();
  }
}
