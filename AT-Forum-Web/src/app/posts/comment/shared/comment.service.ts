import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../shared/comment';
import {Topic} from "../../shared/topic";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) {
  }

  createComment(comment: Comment): Observable<Comment> {
    return from(this.afs.collection('comments').add(comment))
      .pipe(map(() => {
        return comment;
      }));
  }

  getAllComments(): Observable<Comment[]> {
    return this.afs.collection<Comment>('comments').snapshotChanges()
      .pipe(
        map(docActions => {
          return docActions.map(docAction => {
            const data = docAction.payload.doc.data();
            const comment: Comment = {
              id: docAction.payload.doc.id,
              author: data.author,
              message: data.message,
              header: data.header,
            };
            return comment;
          });
        })
      );
  }
}
