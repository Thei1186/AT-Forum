import {User} from '../../users/shared/user';

export interface Comment {
  id: string;
  message: string;
  header: string;
  author: User;
}