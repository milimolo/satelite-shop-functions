import * as admin from 'firebase-admin';
const serviceAccount = require("../secret.json");
import * as functions from 'firebase-functions';
import {DependencyFactory} from './dependency-factory';
const difa = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://satelite-database.firebaseio.com"
});

exports.addOrderRemovesStock = functions.firestore
  .document('Orders/{orderId}')
  .onCreate((snap, context) => {
    return difa.getOrderController().placeOrder(snap, context);
  });
