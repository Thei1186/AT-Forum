import {CommentRepository} from "./comment.repository";

export class CommentService {
    /*
This class is no longer used, but is kept to show how it was before refactoring.
It is not commented out to avoid having to deal with tsLint
 */

    constructor(private commentRepository: CommentRepository) {
    }

    deleteCommentsFromTopic(commentId: string) {
        return this.commentRepository.deleteCommentsFromTopic(commentId);
    }
}
