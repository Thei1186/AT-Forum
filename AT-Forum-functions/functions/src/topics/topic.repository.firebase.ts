import {TopicRepository} from "./topic.repository";
import {Comment} from "../models/comment";
import * as admin from "firebase-admin";
import {Topic} from "../models/topic";

export class TopicRepositoryFirebase implements TopicRepository {
    topicPath = 'topics';

    async updateTopicComments(comment: Comment): Promise<void> {
        await this.db().collection(`${this.topicPath}`).doc(`${comment.topicId}`)
            .update({
                comments: admin.firestore.FieldValue.arrayUnion(comment)
            })
            .catch(err => {
                return Promise.reject('Failed to update topic comments got message: \n' + err.message);
            });
        return Promise.resolve();
    }

    db() {
        return admin.firestore();
    }

    async deleteTopics(catId: String): Promise<void> {
        await this.db().collection(`${this.topicPath}`)
            .where('categoryId', '==', `${catId}`).get()
            .then((query) => {
                const batch = this.db().batch();
                query.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            }).catch((err) => {
                return Promise.reject('Failed to delete all topics with category id: ' + catId + '\n threw error: ' +
                    err.message)
            });
    }

    async removeCommentFromTopic(comment: Comment, topicId: string): Promise<void> {
        console.log("Comment", comment);
        await this.db().collection(`${this.topicPath}`).doc(`${topicId}`)
            .update({
                comments: admin.firestore.FieldValue.arrayRemove(comment)
            }).then(() => {
                return Promise.resolve()
            })
            .catch(err => {
                return Promise.reject('Failed to remove comment from Topic with message: ' + err.message);
            });
    }

    async editTopicComments(commentAfter: Comment, commentBefore: Comment): Promise<void> {
        const topic = await this.db().collection(`${this.topicPath}`).doc(`${commentAfter.topicId}`).get();
        const topicData = topic.data() as Topic;
        const comment = topicData.comments.find(com => com.id === commentAfter.id) as Comment;
        comment.message = commentAfter.message;
        await this.db().collection(`${this.topicPath}`).doc(`${commentAfter.topicId}`)
            .update({
                comments: topicData.comments
            }).then(() => {
                return Promise.resolve()
            }).catch(err => {
                return Promise.reject('Failed to update comment in Topic with message: ' + err.message);
            });
    }
}
