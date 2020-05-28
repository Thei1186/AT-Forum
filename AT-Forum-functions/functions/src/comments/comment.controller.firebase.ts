import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";


export class CommentControllerFirebase implements CommentController {
    constructor(private commentService: CommentService) {
    }

    /*
    This class is no longer used, but is kept to show how it was before refactoring.
    It is not commented out to avoid having to deal with tsLint
     */
    deleteCommentsFromTopic(snap: DocumentSnapshot, context: EventContext) {
        const commentId = context.params.id as string;
        return this.commentService.deleteCommentsFromTopic(commentId);
    }
}
