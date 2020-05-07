import {Topic} from '../../posts/shared/topic';

export interface User {
  uid: string;
  name: string;
  username: string;
  email: string;
  photoURL: string;
  favouriteTopics?: Topic[];
}
