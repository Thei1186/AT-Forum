import {User} from '../../users/shared/user';
import {Comment} from './comment';

export interface Topic {
  id?: string;
  topicName: string;
  description: string;
  author: User;
  categoryId: string;
}
