import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {StockRepository} from './stock/stock.repository';
import {OrderController} from './orders/order.controller';
import {OrderService} from './orders/order.service';
import {OrderControllerFirebase} from './orders/order.controller.firebase';
import {ProductController} from './products/product.controller';
import {ProductService} from './products/product.service';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {OrderRepository} from './orders/order.repository';
import {OrderRepositoryFirebase} from './orders/order.repository.firebase';

export class DependencyFactory {
  getProductController(): ProductController {
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: ProductService = new ProductService(repoStock);
    return new ProductControllerFirebase(service)
  }
  getOrderController(): OrderController {
    const repoOrder: OrderRepository = new OrderRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(repoOrder, repoStock);
    return new OrderControllerFirebase(service)
  }
}
