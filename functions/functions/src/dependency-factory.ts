import {ProductRepository} from './products/product.repository';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {StockRepository} from './stock/stock.repository';
import {OrderController} from './orders/order.controller';
import {OrderService} from './orders/order.service';
import {OrderControllerFirebase} from './orders/order.controller.firebase';

export class DependencyFactory {
  getOrderController(): OrderController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(repoProduct, repoStock);
    return new OrderControllerFirebase(service)
  }
}
