import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../shared/comment';

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

  deleteComment(id: string) {
    return from(this.afs.collection('comments').doc<Comment>(id).delete());
  }
}
