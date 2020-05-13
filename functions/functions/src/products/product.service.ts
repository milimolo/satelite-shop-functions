import { Product } from '../models/product'
import { ProductRepository } from './product.repository'
import {StockRepository} from "../stock/stock.repository";

export class ProductService {
  constructor(private productRepository: ProductRepository,
              private stockRepo: StockRepository) {}

  writeProducts(
    prodId: string,
    productBefore: Product,
    productAfter: Product
  ): Promise<void> {
    if (productAfter) {
      return this.productRepository.setTopProducts({
        id: prodId,
        model: productAfter.model,
        price: productAfter.price,
        brand: productAfter.brand
      })
    } else {
      return this.productRepository.deleteTopProducts(prodId)
    }
  }

  updateTopProduct(
    prodId: string,
    productBefore: Product,
    productAfter: Product): Promise<void> {
    const model = productAfter.model.toUpperCase();
    return this.productRepository.setTopProducts({
      id: prodId,
      model: model,
      price: productAfter.price,
      brand: productAfter.brand
    });
  }

  async create(product: Product): Promise<Product> {
    await this.productRepository.create(product);
    await this.stockRepo.create(product, 2);
    return Promise.resolve(product);
  }
}
