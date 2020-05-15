import * as admin from 'firebase-admin';
import {ProductRepository} from './product.repository';

export class ProductRepositoryFirebase implements ProductRepository {

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}
