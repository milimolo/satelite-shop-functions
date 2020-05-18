import {Order} from "../../src/models/order";
import {Stock} from "../../src/models/stock";
import {StockRepository} from "../../src/stock/stock.repository";
import {OrderRepository} from "../../src/orders/order.repository";
import {ProductRepository} from "../../src/products/product.repository";
import {Product} from '../../src/models/products/product';
import {IMock, Mock} from 'moq.ts';

export class TestHelper {

    getOrderRepositoryMock(): IMock<OrderRepository> {
        return new Mock<OrderRepository>();
    }

    getStockRepositoryMock(): IMock<StockRepository> {
        return new Mock<StockRepository>()
            .setup(stockRepo => stockRepo.create(this.getStock1()))
            .returns(Promise.resolve(this.getStock1()));
    }

    getProduct1(): Product {
        return this.product1;
    }

    getProduct2(): Product {
        return this.product2;
    }

    getStock1(): Stock {
        return this.stock1;
    }

    getOrder1(): Order {
        return this.order1;
    }

    stock1: Stock = {
      productId: this.getProduct1().id,
      count: 1,
      model: this.getProduct1().model,
      brand: this.getProduct1().brand
    };

    product1: Product = {
        model: 'Product 1',
        id: 'p1',
        brand: 'brand 1',
        price: 22122
    };

    product2: Product = {
      model: 'Product 2',
      id: 'p2',
      brand: 'brand 2',
      price: 22333
    };

    order1: Order = {
        orderLines: [{
          product: this.getProduct1(),
          amount: 1,
          totalPrice: 1000
        }],
        totalPrice: 1000
    };

}
