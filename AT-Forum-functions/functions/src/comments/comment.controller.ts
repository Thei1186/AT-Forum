import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface CommentController {
    /*
This interface is no longer used, but is kept to show how it was before refactoring.
It is not commented out to avoid having to deal with tsLint
 */
    deleteCommentsFromTopic(snap: DocumentSnapshot, context: EventContext): Promise<void>
}
