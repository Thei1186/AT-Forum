export interface CommentRepository {
    /*
This interface is no longer used, but is kept to show how it was before refactoring.
It is not commented out to avoid having to deal with tsLint
 */
    deleteCommentsFromTopic(commentId: string): Promise<void>;
}
