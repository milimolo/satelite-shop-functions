import {Order} from '../models/order';
import {StockRepository} from "../stock/stock.repository";
import {OrderRepository} from "./order.repository";
import {Stock} from '../models/stock';
import {Product} from '../models/products/product';

export class OrderService{

  constructor(private orderRepo: OrderRepository, private stockRepo: StockRepository){
    console.log(this.orderRepo);
  }

  removeStock(order: Order): Promise<any> {
    if (order.orderLines.length > 0) {
      order.orderLines.forEach(orderLine => {
        const stockPromise = this.stockRepo.getStockByID(orderLine.product.id);
        stockPromise.then(stock => {
          if (stock) {
            this.subtrackAmountFromStock(stock, orderLine.amount);
            return this.stockRepo.updateStock(orderLine.product.id, stock);
          }else {
            return null;
          }
        }).catch(error => {
          throw new TypeError(error);
        })
      });
      return Promise.resolve();
    } else {
      throw new TypeError('You need an order line to execute an order');
    }
  }

  renameStocks(productBefore: Product, productAfter: Product): Promise<any> {
    return this.stockRepo.renameStocks(productBefore, productAfter);
  }

  subtrackAmountFromStock(stock: Stock, amount: number): void {
    const newAmount = stock.count - amount;
    if (newAmount >= 0) {
      stock.count = newAmount
    } else {
      stock.count = 0;
    }
  }
}
