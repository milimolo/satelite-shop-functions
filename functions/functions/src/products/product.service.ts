import {StockRepository} from '../stock/stock.repository';
import {Stock} from '../models/stock';
import {Product} from '../models/products/product';

export class ProductService {

  private defaultStockCount: number = 3;
  constructor(private stockRepo: StockRepository) {}
  async create(product: Product): Promise<any> {
    const stock = this.createStock(product);
    await this.stockRepo.create(stock);
    return Promise.resolve(stock);
  }

  createStock(product: Product): Stock {
      return {
        productId: product.id,
        model: product.model,
        brand: product.brand,
        count: this.defaultStockCount
      };
  }

  delete(product: Product): Promise<any> {
    return this.stockRepo.deleteStock(product);
  }

  renameModelStock(productBefore: Product, productAfter: Product): Promise<any> {
    if(productAfter.model !== productBefore.model){
      return this.stockRepo.renameModelStocks(productBefore, productAfter);
    }else {
      throw new TypeError('You cannot reuse the old model name');
    }
  }
}
