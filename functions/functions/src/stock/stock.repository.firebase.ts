import {StockRepository} from "./stock.repository";
import {Product} from "../models/products/product";
import * as admin from "firebase-admin";
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

  async updateStock(productID: string, stock: Stock): Promise<any> {
    const stockRef = this.db().collection('Stock').doc(productID);
    await stockRef.update({
      model: stock.model,
      brand: stock.brand,
      count: stock.count
    });
    return Promise.resolve();
  }

  async getStockByID(productID: string): Promise<Stock> {
    let stock = undefined as any;
    const docRef = this.db().collection('Stock').doc(productID);
    await docRef.get().then( doc => {
      if (doc.exists) {
        stock = doc.data() as Stock;
        stock.productId = doc.id;
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

  async deleteStock(product: Product): Promise<any> {
    const stockCollection = this.db().collection('Stock');
    return await stockCollection.doc(product.id).delete();
  }
}
