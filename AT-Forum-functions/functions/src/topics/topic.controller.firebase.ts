import {TopicController} from "./topic.controller";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {TopicService} from "./topic.service";
import {Topic} from "../models/topic";

export class TopicControllerFirebase implements TopicController {

    constructor(private service: TopicService) {
    }

    deleteTopicsWhenCategoryDeleted(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const catId = context.params.id as string;
        return this.service.deleteTopicsWhenCategoryDeleted(catId);
    }

    deleteFavoriteWhenTopicIsDeleted(snapshot: DocumentSnapshot, context: EventContext) {
        const topic = snapshot.data() as Topic;
        const topId = context.params.id as string;
        topic.id = topId;
        return this.service.deleteFavoriteWhenTopicIsDeleted(topic);
    }

    /*
    updateTopicUpdateFavoriteTopic(change: Change<DocumentSnapshot>, context: EventContext) {
        const topicBefore = change.before.data() as Topic;
        topicBefore.id = context.params.id;
        const topicAfter = change.after.data() as Topic;
        topicAfter.id = context.params.id;
        return this.service.updateTopicUpdateFavoriteTopic(topicBefore, topicAfter);

    updateTopicComments(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const comment = snap.data() as Comment;
        comment.id = context.params.id;
        return this.service.updateTopicComments(comment);
    }

    removeCommentFromTopic(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const comment = snap.data() as Comment;
        comment.id = context.params.id;
        const topicId = comment.topicId as string;
        return this.service.removeCommentFromTopic(comment, topicId);
    }

    editTopicComments(change: Change<DocumentSnapshot>, context: EventContext) {
        const commentBefore = change.before.data() as Comment;
        commentBefore.id = context.params.id;
        const commentAfter = change.after.data() as Comment;
        commentAfter.id = context.params.id;
        return this.service.editTopicComments(commentAfter, commentBefore);
    }
     */
}
