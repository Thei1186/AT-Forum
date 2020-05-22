import {Comment} from "../models/comment";


export interface TopicRepository {
    updateTopicComments(comment: Comment): Promise<void>;

    deleteTopicsWhenCategoryDeleted(catId: String): Promise<void>;

    removeCommentFromTopic(comment: Comment, topicId: string): Promise<void>;

    /*
    editTopicComments(commentAfter: Comment, commentBefore: Comment): Promise<void>;
    */
}
