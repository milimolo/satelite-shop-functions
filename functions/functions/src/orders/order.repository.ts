import {Product} from '../models/products/product';

export interface OrderRepository {
  renameProductsInOrderLines(productBefore: Product, productAfter: Product): Promise<any>;
}
