import { Laptop } from '../data/mockLaptops';

export type AppView = 'home' | 'detail' | 'compare';

export interface AppState {
  view: AppView;
  selectedLaptop: Laptop | null;
  compareList: Laptop[];
}
