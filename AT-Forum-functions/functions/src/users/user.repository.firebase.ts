import {UserRepository} from "./user.repository";
import * as admin from "firebase-admin";
import {User} from "../models/user";
import {Topic} from "../models/topic";
import {Comment} from "../models/comment";

export class UserRepositoryFirebase implements UserRepository {
    topicsPath = 'topics';
    commentsPath = 'comments';

    deleteUser(uid: string): Promise<any> {
        return this.auth().deleteUser(`${uid}`)
            .then(() => {
                console.log('The user with id: ' + uid + 'was deleted');
            }).catch((ex) => {
                console.log('Something went wrong: ' + ex.message)
            });
    }

    async updateUserUpdatesAuthor(userBefore: User, userAfter: User): Promise<User> {
        const batch = this.db().batch();
        console.log(userBefore);
        await this.db().collection(`${this.topicsPath}`).where('author', '==', `${userBefore}`).get()
            .then((query) => {
                query.forEach((doc) => {
                    const data = doc.data() as Topic;
                    data.author = userAfter;
                    const topicRef = doc.ref;
                    batch.set(topicRef, data, {merge: true});
                });
            }).catch(err => {
                return Promise.reject('Failed to update author' + err.message);
            });

        await this.db().collection(`${this.commentsPath}`).where('author', '==', `${userBefore}`).get()
            .then((query) => {
                query.forEach((doc) => {
                    const data = doc.data() as Comment;

                    data.author = userAfter;
                    const commentRef = doc.ref;
                    batch.set(commentRef, data, {merge: true});
                });
            }).catch(err => {
                return Promise.reject('Failed to update author' + err.message);
            });

        return await batch.commit().then(() => {
            return Promise.resolve(userAfter);
        }).catch(err => {
            return Promise.reject('Failed to update author' + err.message);
        });
    }

    auth() {
        return admin.auth();
    }

    db() {
        return admin.firestore();
    }
}
