import {StockRepository} from "./stock.repository";
import {Product} from "../models/products/product";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;
import {Stock} from '../models/stock';

export class StockRepositoryFirebase implements StockRepository{
  stockPath = 'Stock'

  async create(product: Product, number: number): Promise<Stock> {
    const stock: Stock = {product: product, count: number};
    await this.db().collection(`${this.stockPath}`).add(stock);
    return Promise.resolve(stock);
  }

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  async lowerStock(product: Product, amount: number): Promise<void> {
    const stock = await this.db().doc(`${this.stockPath}/${product.id}`);
    stock.update({amount: FieldValue.increment(-amount) }).then(function() {
      console.log("Document successfully updated!");
    })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    return Promise.resolve();
  }
}
