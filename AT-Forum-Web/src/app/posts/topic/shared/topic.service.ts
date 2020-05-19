import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from '../../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private afs: AngularFirestore) {
  }

  createTopic(topic: Topic): Observable<Topic> {
    return from(this.afs.collection('topics').add(topic))
      .pipe(map(() => {
        return topic;
      }));
  }

  getAllTopics(): Observable<Topic[]> {
    return this.afs.collection<Topic>('topics').snapshotChanges()
      .pipe(
        map(docActions => {
          return docActions.map(docAction => {
            const data = docAction.payload.doc.data();
            const topic: Topic = {
              id: docAction.payload.doc.id,
              author: data.author,
              comments: data.comments,
              description: data.description,
              topicName: data.topicName
            };
            return topic;
          });
        }));
  }

  getAllTopicComments(id: string): Observable<Comment[]> {
    return this.afs.collection('topics').doc<Topic>(id)
      .snapshotChanges()
      .pipe(map(snap => {
        return snap.payload.data().comments;
      }));
  }

  getTopic(id: string): Observable<Topic> {
    return this.afs.collection('topics').doc<Topic>(id).snapshotChanges()
      .pipe(
        map((document) => {
          const data = document.payload.data();
          if (data) {
            const topic: Topic = {
              id: document.payload.id,
              categoryId: data.categoryId,
              author: data.author,
              topicName: data.topicName,
              description: data.description,
              comments: data.comments
            };
            return topic;
          }
        })
      );
  }

  deleteTopic(id: string) {
    return from(this.afs.collection('topics').doc<Topic>(id).delete());
  }

  editTopic(topic: Topic) {
    const userRef: AngularFirestoreDocument<Topic> = this.afs.doc(`topics/${topic.id}`);
    return from(userRef.set(topic, {merge: true}))
      .pipe(map(() => {
        return topic;
      }));
  }

  getFavorites(id: string): Observable<Topic> {
    return this.afs.collection('favoriteTopics').doc(id).snapshotChanges()
      .pipe(
        map((document) => {
          const data = document.payload.data();
          if (data) {
            const topic: Topic = {
              id: document.payload.id,
              categoryId: data.categoryId,
              author: data.author,
              topicName: data.topicName,
              description: data.description,
            };
            return topic;
          }
        })
      );
  }
}
