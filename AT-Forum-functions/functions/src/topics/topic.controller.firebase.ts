import {TopicController} from "./topic.controller";
import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {TopicService} from "./topic.service";
import {Topic} from "../models/topic";
import {FavoriteTopic} from "../models/favoriteTopic";

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
	
	updateTopicUpdateFavoriteTopic(change: Change<DocumentSnapshot>, context: EventContext) {
        const favoriteTopicBefore = change.before.data() as FavoriteTopic;
        favoriteTopicBefore.id = context.params.id;
        const favoriteTopicAfter = change.after.data() as FavoriteTopic;
        favoriteTopicAfter.id = context.params.id;
        return this.service.updateTopicUpdateFavoriteTopic(favoriteTopicBefore, favoriteTopicAfter);

    /*
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
}
