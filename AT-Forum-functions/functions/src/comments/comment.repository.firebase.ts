import {CommentRepository} from "./comment.repository";
import * as admin from "firebase-admin";

export class CommentRepositoryFirebase implements CommentRepository{
    commentPath = 'comments';
    async deleteComments(topicId: string): Promise<void> {
        await this.db().collection(`${this.commentPath}`)
            .where('topicId', '==', `${topicId}`).get()
            .then((query) => {
                const batch = this.db().batch();
                query.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            }).catch((err) => {
                return Promise.reject('Failed to delete all comments with the topicId of ' + topicId
                    + '\n threw error: ' + err.message)
            })
    }

    db() {
        return admin.firestore();
    }
}
