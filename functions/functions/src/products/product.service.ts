import {StockRepository} from '../stock/stock.repository';
import {Stock} from '../models/stock';
import {Product} from "../models/products/product";

export class ProductService {

  private defaultStockCount: number = 3;
  constructor(private stockRepo: StockRepository) {}
  async create(product: Product): Promise<any> {
    const stock = this.createStock(product);
    await this.stockRepo.create(stock);
    return Promise.resolve(stock);
  }

  createStock(product: Product): Stock {
    const stock: Stock = {
      productId: product.id,
      model: product.model,
      brand: product.brand,
      count: this.defaultStockCount
    };
    return stock;
  }

  delete(product: Product): Promise<any> {
    return this.stockRepo.deleteStock(product);
  }

  renameModelStock(productBefore: Product, productAfter: Product): Promise<any> {
    return this.stockRepo.renameModelStocks(productBefore, productAfter);
  }
}
