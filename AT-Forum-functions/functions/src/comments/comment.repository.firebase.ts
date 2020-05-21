import {CommentRepository} from "./comment.repository";
import * as admin from "firebase-admin";

export class CommentRepositoryFirebase implements CommentRepository{
    commentPath = 'comments';

    async deleteCommentsFromTopic(commentId: string): Promise<void> {
        await this.db().collection(`${this.commentPath}`)
            .where('topicId', '==', `${commentId}`).get()
            .then((query) => {
                const batch = this.db().batch();
                query.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            }).catch((err) => {
                return Promise.reject('Failed to delete all topics with category id: ' + commentId + '\n threw error: ' +
                    err.message)
            });
    }

    db() {
        return admin.firestore();
    }

}
