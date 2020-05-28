import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface TopicController {
    deleteTopicsWhenCategoryDeleted(snap: DocumentSnapshot, context: EventContext): Promise<void>
    /*
    updateTopicUpdateFavoriteTopic(change: Change<DocumentSnapshot>, context: EventContext): Promise<void>
    
    updateTopicComments(snap: DocumentSnapshot, context: EventContext): Promise<void>;

    removeCommentFromTopic(snap: DocumentSnapshot, context: EventContext): Promise<void>;

    editTopicComments(change: Change<DocumentSnapshot>, context: EventContext)
    */
}
