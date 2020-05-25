import {CommentRepository} from "./comment.repository";
import * as admin from "firebase-admin";

export class CommentRepositoryFirebase implements CommentRepository{
    /*
This class is no longer used, but is kept to show how it was before refactoring.
It is not commented out to avoid having to deal with tsLint
 */

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
