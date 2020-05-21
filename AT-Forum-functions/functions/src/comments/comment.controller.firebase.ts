import {CommentController} from "./comment.controller";
import {CommentService} from "./comment.service";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";



export class CommentControllerFirebase implements CommentController{
    constructor(private commentService: CommentService) {
    }

    deleteCommentsFromTopic(snap: DocumentSnapshot, context: EventContext) {
        const commentId = context.params.id as string;
        return this.commentService.deleteCommentsFromTopic(commentId);
    }
}
