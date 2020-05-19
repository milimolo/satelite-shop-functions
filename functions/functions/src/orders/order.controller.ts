import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from 'firebase-functions';

export interface OrderController {
  removeStock(snapshot: DocumentSnapshot, context: EventContext): Promise<any>;
  renameProductsInOrderLines(snapshot: Change<DocumentSnapshot>, context: EventContext): Promise<any>;
}
