import {Product} from "../models/products/product";
import {Stock} from "../models/stock";

export interface StockRepository {
  create(stock: Stock): Promise<any>;
  getStockByID(productID: string): Promise<Stock>;
  renameModelStocks(productBefore: Product, productAfter: Product): Promise<any>;
  updateStock(productID: string, stock: Stock): Promise<any>;
  deleteStock(product: Product): Promise<any>;
}
