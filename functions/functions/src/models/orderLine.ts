import {Product} from './products/product';

export interface Orderline {
  product: Product;
  amount: number;
}
