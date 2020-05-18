import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Stock} from '../models/stock';

export class ProductControllerFirebase implements ProductController {

  constructor(private productService: ProductService) { }
  create(snap: DocumentSnapshot, context: EventContext): Promise<any> {
    const stock = snap.data() as Stock;
    return this.productService.create(stock);
  }
}
