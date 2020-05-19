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
    return difa.getOrderController().removeStock(snap, context);
  });
exports.createStockOnNewSatellites = functions.firestore
  .document('Satellites/{id}')
  .onCreate((snapshot, context) => {
    return difa.getProductController().create(snapshot, context);
  });
exports.createStockOnNewFuel = functions.firestore
  .document('Fuel/{id}')
  .onCreate((snapshot, context) => {
    return difa.getProductController().create(snapshot, context);
  });

exports.deleteStockOnDeleteStallite = functions.firestore
  .document('Satellites/{id}')
  .onDelete((snapshot, context) => {
    return difa.getProductController().delete(snapshot, context);
  });

exports.deleteStockOnDeleteFuel = functions.firestore
  .document('Fuel/{id}')
  .onDelete((snapshot, context) => {
    return difa.getProductController().delete(snapshot, context);
  });

exports.renameModelsSatellite = functions.firestore
  .document('Satellites/{id}')
  .onUpdate((snapshot, context) => {
    difa.getOrderController().renameProductsInOrderLines(snapshot, context).then(success => {
      return difa.getProductController().renameModelOnStocks(snapshot, context);
    }).catch(error => {
      throw new TypeError(error);
    });
  });

exports.renameModelsFuel = functions.firestore
  .document('Fuel/{id}')
  .onUpdate((snapshot, context) => {
    difa.getOrderController().renameProductsInOrderLines(snapshot, context).then(success => {
      return difa.getProductController().renameModelOnStocks(snapshot, context);
    }).catch(error => {
      throw new TypeError(error);
    });
  });
