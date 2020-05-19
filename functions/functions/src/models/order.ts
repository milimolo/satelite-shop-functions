import {Orderline} from './orderLine';

export interface Order {
  orderId: string;
  orderLines: Orderline[];
  totalPrice: number;
}
