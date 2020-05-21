import {CommentRepository} from "./comment.repository";

export class CommentService {
    constructor(private commentRepository: CommentRepository) {
    }

    deleteCommentsFromTopic(commentId: string) {
        return this.commentRepository.deleteCommentsFromTopic(commentId);
    }
}
