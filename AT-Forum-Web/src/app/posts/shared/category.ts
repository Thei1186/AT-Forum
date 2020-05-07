import {Topic} from './topic';

export interface Category {
  id: string;
  categoryName: string;
  description: string;
  topics: Topic[];
}
