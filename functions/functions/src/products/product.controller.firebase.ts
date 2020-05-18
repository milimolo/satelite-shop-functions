import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Product} from "../models/products/product";

export class ProductControllerFirebase implements ProductController {

  constructor(private productService: ProductService) { }
  create(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    const product = snap.data() as Product;
    product.id = snap.id;
    return this.productService.create(product);
  }

  delete(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    const product = snap.data() as Product;
    product.id = snap.id;
    return this.productService.delete(product);
  }
}
