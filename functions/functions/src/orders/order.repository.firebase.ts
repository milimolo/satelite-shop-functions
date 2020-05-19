import {OrderRepository} from './order.repository';
import {Product} from '../models/products/product';
import {Order} from '../models/order';
import * as admin from 'firebase-admin';

export class OrderRepositoryFirebase implements OrderRepository{
  async renameProductsInOrderLines(productBefore: Product, productAfter: Product): Promise<any> {
    const orderCollection = this.db().collection('Orders');
    const snapshot = await orderCollection.get();
    snapshot.forEach( doc => {
      const order = doc.data() as Order;
      order.orderLines.forEach(orderLine => {
        if (orderLine.product.model === productBefore.model) {
          orderLine.product.model = productAfter.model
        }
      });
      return doc.ref.update(order);
    });
    return Promise.resolve();
  }

  db(): FirebaseFirestore.Firestore{
    return admin.firestore();
  }
}
