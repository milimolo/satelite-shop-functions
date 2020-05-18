import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";

export interface OrderController {
  renameStock(snapshot: Change<DocumentSnapshot>, context: EventContext): Promise<any>;
  removeStock(snapshot: DocumentSnapshot, context: EventContext): Promise<any>;
  addStock(snapshot: DocumentSnapshot, context: EventContext): Promise<any>;
}
