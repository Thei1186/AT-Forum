export interface CommentRepository {

    deleteComments(topicId: string): Promise<void>;
}
