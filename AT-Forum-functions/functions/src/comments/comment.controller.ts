import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface CommentController {
    deleteComments(snap: DocumentSnapshot, context: EventContext): Promise<void>;
}
