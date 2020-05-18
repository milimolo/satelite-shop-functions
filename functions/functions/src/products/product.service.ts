import {StockRepository} from '../stock/stock.repository';
import {Stock} from '../models/stock';

export class ProductService {
  constructor(private stockRepo: StockRepository) {}
  async create(stock: Stock): Promise<any> {
    await this.stockRepo.create(stock);
    return Promise.resolve(stock);
  }
}
