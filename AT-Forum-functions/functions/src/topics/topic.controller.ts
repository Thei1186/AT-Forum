import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface TopicController {
    updateTopicComments(snap: DocumentSnapshot, context: EventContext): Promise<void>;
    removeCommentFromTopic(snap: DocumentSnapshot, context: EventContext): Promise<void>;
}
