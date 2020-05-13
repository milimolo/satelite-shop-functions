import {Order} from './order';

export interface User {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  orders?: Order[];
  address?: string;
  city?: string;
  zipCode?: number;
}
