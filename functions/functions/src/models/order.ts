import {Orderline} from './orderLine';

export interface Order {
  orderLines: Orderline[];
  totalPrice: number;
}
