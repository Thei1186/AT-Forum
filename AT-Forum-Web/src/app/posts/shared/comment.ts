import {User} from '../../users/shared/user';

export interface Comment {
  id: string;
  message: string;
  author: User;
  topicId?: string;
}
