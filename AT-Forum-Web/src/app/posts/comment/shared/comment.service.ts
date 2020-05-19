import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) {
  }

  getComment(id: string): Observable<Comment> {
    return this.afs.collection('comments').doc<Comment>(id).snapshotChanges()
      .pipe(
        map((document) => {
          const data = document.payload.data();
          if (data) {
            const comment: Comment = {
              id: document.payload.id,
              author: data.author,
              message: data.message,
              topicId: data.topicId
            };
            return comment;
          }
        })
      );
  }

  createComment(comment: Comment): Observable<Comment> {
    return from(this.afs.collection('comments').add(comment))
      .pipe(map(() => {
        return comment;
      }));
  }

  deleteComment(id: string) {
    return from(this.afs.collection('comments').doc<Comment>(id).delete());
  }

  editComment(comment: Comment) {
    const userRef: AngularFirestoreDocument<Comment> = this.afs.doc(`comments/${comment.id}`);
    const editComment: Comment = {
      message: comment.message,
      topicId: comment.topicId,
      author: comment.author
    };
    return from(userRef.set(editComment, {merge: true}))
      .pipe(map(() => {
        return editComment;
      }));
  }
}
