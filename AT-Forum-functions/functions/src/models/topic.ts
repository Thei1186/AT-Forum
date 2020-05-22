import {User} from "./user";

export interface Topic {
    id: string;
    topicName: string;
    description: string;
    author: User;
    categoryId: string;
}
