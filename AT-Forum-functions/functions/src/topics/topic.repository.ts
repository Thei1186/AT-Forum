export interface TopicRepository {
    deleteTopicsWhenCategoryDeleted(catId: String): Promise<void>;
    deleteFavoriteWhenTopicIsDeleted(topId: string): Promise<void>;
    /*
    removeCommentFromTopic(comment: Comment, topicId: string): Promise<void>;
    updateTopicComments(comment: Comment): Promise<void>;
    editTopicComments(commentAfter: Comment, commentBefore: Comment): Promise<void>;
    */

}
