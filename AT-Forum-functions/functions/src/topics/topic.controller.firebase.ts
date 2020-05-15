import {TopicController} from "./topic.controller";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {TopicService} from "./topic.service";
import {Comment} from "../models/comment";

export class TopicControllerFirebase implements TopicController {

    constructor(private service: TopicService) {
    }

    updateTopicComments(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const comment = snap.data() as Comment;
        comment.id = context.params.id;
        return this.service.updateTopicComments(comment);
    }

    deleteTopics(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const catId = context.params.id as string;
        return this.service.deleteTopics(catId);
    }

    removeCommentFromTopic(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const comment = snap.data() as Comment;
        comment.id = context.params.id;
        const topicId = comment.topicId as string;
        return this.service.removeCommentFromTopic(comment, topicId);
    }
}
