import {CommentRepository} from "./comment.repository";

export class CommentService {
    constructor(private commentRepository: CommentRepository) {
    }

    deleteComments(topicId: string): Promise<void> {
        return this.commentRepository.deleteComments(topicId);
    }
}
