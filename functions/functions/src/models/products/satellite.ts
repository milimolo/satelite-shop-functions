import {Product} from './product';

export interface Satellite extends Product {
  weight: number;
  volume: number;
  maxRange: number;
}
