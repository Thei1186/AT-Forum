export interface TopicRepository {
    deleteTopicsWhenCategoryDeleted(catId: String): Promise<void>;

    
    /*
    deleteFavoriteWhenTopicIsDeleted(topic: Topic): Promise<void>;
    updateTopicUpdateFavoriteTopic(topicBefore: Topic, topicAfter: Topic): Promise<void>;
    removeCommentFromTopic(comment: Comment, topicId: string): Promise<void>;
    updateTopicComments(comment: Comment): Promise<void>;
    editTopicComments(commentAfter: Comment, commentBefore: Comment): Promise<void>;
    */

    
}
