export interface CommentRepository {

    deleteCommentsFromTopic(commentId: string): Promise<void>;
}
