import {Product} from "../models/products/product";
import {Stock} from "../models/stock";

export interface StockRepository {
  create(product: Product, number: number): Promise<Stock>;

  lowerStock(product: Product, amount: number): Promise<void>;
}
