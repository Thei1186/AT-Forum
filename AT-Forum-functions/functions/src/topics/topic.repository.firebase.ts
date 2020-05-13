import {TopicRepository} from "./topic.repository";
import {Comment} from "../models/comment";
import * as admin from "firebase-admin";

export class TopicRepositoryFirebase implements TopicRepository{
    topicPath = 'topics';
   async updateTopicComments(comment: Comment): Promise<void> {
        this.db().collection(`${this.topicPath}`).doc(`${comment.topicId}`)
            .update({
                comments: admin.firestore.FieldValue.arrayUnion(comment)
            })
            .catch(err => {
               return Promise.reject('Failed to update topic got message: \n' + err.message);
            });
        return Promise.resolve();
    }

    db() {
        return admin.firestore();
    }
}