import * as admin from 'firebase-admin';
const serviceAccount = require("../secret.json");
import * as functions from 'firebase-functions';
import {DependencyFactory} from './dependency-factory';
const difa = new DependencyFactory()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://satelite-database.firebaseio.com"
});

exports.addOrderRemovesStock = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    return difa.getOrderController().placeOrder(snap, context);
  });

exports.productWritten = functions.firestore
  .document('products/{id}')
  .onWrite((snap, context) => {
    return difa.getProductController().writtenProducts(snap, context);
  });

exports.topProductUpdated = functions.firestore
  .document('top-products/{id}')
  .onUpdate((snap, context) => {
    return difa.getProductController().updatedTopProduct(snap, context)
  });

exports.setStockOnNewProducts = functions.firestore
  .document('products/{id}')
  .onCreate((snapshot, context) => {
    return difa.getProductController().create(snapshot, context);
  })
