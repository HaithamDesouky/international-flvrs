import { Product } from './product.model';

export interface Order {
  Order: Product[];
  address: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  orderNotes: string;
  paymentType: string;
  telephone: string;
  total: number;
}
