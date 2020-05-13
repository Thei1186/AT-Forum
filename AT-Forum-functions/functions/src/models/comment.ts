import {User} from "./user";

export interface Comment {
    id: string;
    message: string;
    header: string;
    author: User;
    topicId?: string;
}
