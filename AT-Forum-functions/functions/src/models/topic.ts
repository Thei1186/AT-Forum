import {User} from "./user";
import {Comment} from "./comment";

export interface Topic {
    id: string;
    topicName: string;
    description: string;
    author: User;
    comments: Comment[];
    categoryId: string;
}
