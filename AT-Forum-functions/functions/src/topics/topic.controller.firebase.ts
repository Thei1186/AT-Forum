import {TopicController} from "./topic.controller";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {TopicService} from "./topic.service";
import {Comment} from "../models/comment";

export class TopicControllerFirebase implements TopicController{

    constructor(private service: TopicService) {
    }
    updateTopicComments(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const comment = snap.data() as Comment;
        comment.id = context.params.id;
        return this.service.updateTopicComments(comment);
    }

}