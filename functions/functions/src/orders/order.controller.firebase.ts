import {OrderController} from "./order.controller";
import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {OrderService} from "./order.service";
import {Order} from "../models/order";
import {Product} from '../models/products/product';

export class OrderControllerFirebase implements OrderController{
  constructor(private orderService: OrderService) {}

  removeStock(snapshot: DocumentSnapshot, context: EventContext): Promise<any> {
    const order = snapshot.data() as Order;
    return this.orderService.removeStock(order);
  }

  renameStock(snapshot: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productBefore = snapshot.before.data() as Product;
    const productAfter = snapshot.after.data() as Product;
    return this.orderService.renameStocks(productBefore, productAfter);
  }
}
