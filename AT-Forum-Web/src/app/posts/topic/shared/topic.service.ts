import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  getTopic(id: string) {
    return this.afs.collection('topics').doc<Topic>(id).snapshotChanges()
      .pipe(
        map((document) => {
          const data = document.payload.data();
          const topic: Topic = {
            id: document.payload.id,
            categoryId: data.categoryId,
            author: data.author,
            topicName: data.topicName,
            description: data.description,
            comments: data.comments
          };
          return topic;
        })
      );
  }
}
