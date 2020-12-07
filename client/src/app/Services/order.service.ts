import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.apiUrl;
  constructor(
    private firestore: AngularFirestore,
    private shoppingCart: ShoppingCartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private http: HttpClient
  ) {}

  createOrder(order: Order) {
    let oldOrder = this.shoppingCart.get_shopping_cart_items();

    return this.http.post(this.baseUrl + 'order', order).subscribe((data) => {
      this.spinner.hide();

      const navigationExtras: NavigationExtras = {
        state: {
          message: 'Thank you for your purchase',
          products: [oldOrder],
          orderId: Math.floor(Math.random() * 1000000000),
          total: this.shoppingCart.getTotal(),
        },
      };
      this.router.navigate(['/thankyou'], navigationExtras).then((p) => {
        let items = localStorage.getItem('shopping_cart');
        let temp = [...items!];
        temp.length = 0;

        localStorage.setItem('shopping_cart', JSON.stringify(temp));
      });
    });
  }
}

// createOrder(data: any) {
//   return new Promise<any>((resolve, reject) => {
//     this.firestore
//       .collection('orders')
//       .add(data)
//       .then(
//         (res: any) => {
//           const navigationExtras: NavigationExtras = {
//             state: {
//               message: data.message,
//               products: [data.Order],
//               orderId: Math.floor(Math.random() * 1000000000),
//               total: this.shoppingCart.getTotal(),
//             },
//           };
//           this.spinner.hide();
//           this.router.navigate(['/thankyou'], navigationExtras).then((p) => {
//             let items = localStorage.getItem('shopping_cart');
//             let temp = [...items!];
//             temp.length = 0;

//             localStorage.setItem('shopping_cart', JSON.stringify(temp));
//           });
//         },
//         (err: any) => reject(err)
//       );
//   });
// }
