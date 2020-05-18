import {Product} from "../models/products/product";
import {Stock} from "../models/stock";

export interface StockRepository {
  create(stock: Stock): Promise<any>;
  lowerStock(product: Product, amount: number): Promise<void>;
  getStockByID(productID: string): Promise<Stock>;
  renameStocks(productBefore: Product, productAfter: Product): Promise<any>;
  updateStock(productID: string, stock: Stock): Promise<any>;
}
