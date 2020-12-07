import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getAllProducts() {
    if (this.products.length > 0) return of(this.products);

    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map((products) => {
        this.products = products;
        return products;
      })
    );
  }

  getSortedProducts(sort: string) {
    if (sort) {
      return this.http.get<Product[]>(this.baseUrl + 'products' + sort).pipe(
        map((products) => {
          this.products = products;
          return products;
        })
      );
    } else {
      return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
        map((products) => {
          this.products = products;
          return products;
        })
      );
    }
  }

  getSingleProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getCategoryProducts(category: string) {
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(
      map((products) => {
        return products.filter(
          (items) => items.category.toLowerCase() === category.toLowerCase()
        );
      })
    );
  }
}
