import {Order} from '../models/order';
import {StockRepository} from "../stock/stock.repository";
import {OrderRepository} from "./order.repository";
import {Stock} from '../models/stock';
import {Product} from '../models/products/product';

export class OrderService{
  private defaultStockAmount = 2;

  constructor(private orderRepo: OrderRepository, private stockRepo: StockRepository){
    console.log(this.orderRepo);
  }

  addStock(product: Product): Promise<any> {
    if (product) {
      const stock: Stock = this.createStockWithAmount(product)
      return this.stockRepo.create(stock);
    }else {
      return Promise.resolve(undefined as any);
    }
  }

  removeStock(order: Order): Promise<any> {
    order.orderLines.forEach(orderLine => {
      const stockPromise = this.stockRepo.getStockByID(orderLine.product.id);
      stockPromise.then(stock => {
        if (stock) {
          this.subtrackAmountfromStock(stock, orderLine.amount);
          return this.stockRepo.updateStock(orderLine.product.id, stock);
        }else {
          return null;
        }
      }).catch(error => {
        throw new TypeError(error);
      })
    });
    return Promise.resolve();
  }

  renameStocks(productBefore: Product, productAfter: Product): Promise<any> {
    return this.stockRepo.renameStocks(productBefore, productAfter);
  }

  createStockWithAmount(product: Product): Stock {
    const stock: Stock = {
      productId: product.id,
      model: product.model,
      brand: product.brand,
      count: this.defaultStockAmount
    };
    return stock;
  }

  subtrackAmountfromStock(stock: Stock, amount: number): void {
    const newAmount = stock.count - amount;
    if (newAmount >= 0) {
      stock.count = newAmount
    } else {
      stock.count = 0;
    }
  }
}
