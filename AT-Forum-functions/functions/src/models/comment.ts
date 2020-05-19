import {User} from "./user";

export interface Comment {
    id: string;
    message: string;
    author: User;
    topicId?: string;
}
