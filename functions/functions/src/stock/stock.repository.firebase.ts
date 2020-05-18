import {StockRepository} from "./stock.repository";
import {Product} from "../models/products/product";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;
import {Stock} from '../models/stock';

export class StockRepositoryFirebase implements StockRepository{
  stockPath = 'Stock'

  async create(stock: Stock): Promise<any> {
    const stockCollection = this.db().collection('Stock');
    return stockCollection.doc(stock.productId).set({
      model: stock.model,
      brand: stock.brand,
      count: stock.count
    });
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

  async updateStock(productID: string, stock: Stock): Promise<any> {
    const stockRef = this.db().collection('Stock').doc(productID);
    await stockRef.update(stock);
    return Promise.resolve();
  }

  async getStockByID(productID: string): Promise<Stock> {
    let stock = undefined as any;
    const docRef = this.db().collection('Stock').doc(productID);
    await docRef.get().then( doc => {
      if (doc.exists) {
        stock = doc.data() as Stock;
      }
    }).catch(error => {
      //throw new TypeError('Could not retrieve document');
    });
    return Promise.resolve(stock);
  }

  async renameStocks(productBefore: Product, productAfter: Product): Promise<any> {
    const stockCollection = this.db().collection('Stock');
    const snapshot = await stockCollection.get();
    snapshot.forEach(doc => {
      const stock = doc.data() as Stock;
      if (stock.model === productBefore.model) {
        stock.model = productAfter.model;
        return doc.ref.update(stock);
      }else {
        return null;
      }
    });
    return Promise.resolve();
  }
}
