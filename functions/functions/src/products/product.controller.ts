import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {Change, EventContext} from 'firebase-functions';
import {Product} from '../models/products/product';

export interface ProductController {
  create(snap: DocumentSnapshot, context: EventContext): Promise<Product>;
  delete(snap: DocumentSnapshot, context: EventContext): Promise<Product>;
  renameModelOnStocks(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;
}
