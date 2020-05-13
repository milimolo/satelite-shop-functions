import {ProductController} from './products/product.controller';
import {ProductRepository} from './products/product.repository';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {StockRepositoryFirebase} from './stock/stock.repository.firebase';
import {StockRepository} from './stock/stock.repository';
import {ProductService} from './products/product.service';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {OrderController} from './orders/order.controller';
import {OrderService} from './orders/order.service';
import {OrderControllerFirebase} from './orders/order.controller.firebase';

export class DependencyFactory {
  getProductController(): ProductController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: ProductService = new ProductService(repoProduct, repoStock);
    return new ProductControllerFirebase(service)
  }

  getOrderController(): OrderController {
    const repoProduct: ProductRepository = new ProductRepositoryFirebase();
    const repoStock: StockRepository = new StockRepositoryFirebase();
    const service: OrderService = new OrderService(repoProduct, repoStock);
    return new OrderControllerFirebase(service)
  }
}
