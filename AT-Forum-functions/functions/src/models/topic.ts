import {User} from "./user";

export interface Topic {
    id: string;
    topicName: string;
    description: string;
    author: User;
    comments: Comment[];
    categoryId: string;
}
