import {Comment} from "../models/comment";

export interface TopicRepository {
    updateTopicComments(comment: Comment): Promise<void>;
}
