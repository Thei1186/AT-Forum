import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {FavoriteTopic} from '../../shared/favoriteTopic';
import * as firebase from 'firebase';

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

  getTopicsFromCategoryWithPaging(limit: number, topicStart: Topic, catId: string): Observable<Topic[]> {
    if (topicStart === undefined) {
      return from(this.afs.collection<Topic>('topics').ref.limit(limit).orderBy('topicName')
        .where('categoryId', '==', catId)
        .get())
        .pipe(
          first(),
          map((query) => {
            const topics: Topic[] = [];
            query.forEach((snap) => {
              const topic = snap.data() as Topic;
              topic.id = snap.id;
              topics.push(topic);
            });
            return topics;
          })
        );
    } else {
      return this.afs.collection<Topic>('topics').doc(topicStart.id).get().pipe(
        first(),
        switchMap(doc => {
          return this.afs.collection<Topic>('topics', ref => ref.orderBy('topicName').startAfter(doc).limit(limit)
            .where('categoryId', '==', catId))
            .get()
            .pipe(
              map(docs => {
                const topics: Topic[] = [];
                docs.forEach((snap) => {
                  const topic = snap.data() as Topic;
                  topic.id = snap.id;
                  topics.push(topic);
                });
                return topics;
              })
            );
        })
      );
    }
  }

  getPrevTopicsFromCategoryWithPaging(limit: number, topicEnd: Topic, catId: string): Observable<Topic[]> {
    return this.afs.collection('topics').doc(topicEnd.id).get().pipe(
      first(),
      switchMap(doc => {
        return this.afs
          .collection('topics', ref => ref.orderBy('topicName').endBefore(doc).limitToLast(limit)
            .where('categoryId', '==', catId))
          .get()
          .pipe(
            map(docs => {
              const topics: Topic[] = [];
              docs.forEach((snap) => {
                const topic = snap.data() as Topic;
                topic.id = snap.id;
                topics.push(topic);
              });
              return topics;
            })
          );
      })
    );
  }


  getAllTopicsFromCategory(catId: string): Observable<Topic[]> {
    return from(this.afs.collection<Topic>('topics').ref.where('categoryId', '==', catId).get())
      .pipe(
        map((query) => {
          const topics: Topic[] = [];
          query.forEach((snap) => {
            const topic = snap.data() as Topic;
            topic.id = snap.id;
            topics.push(topic);
          });
          return topics;
        })
      );
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

  getFavorites(id: string): Observable<Topic[]> {
    return this.afs.collection('favoriteTopics').doc<FavoriteTopic>(id).snapshotChanges()
      .pipe(
        map((document) => {
          const data = document.payload.data();
          if (data) {
            const favoriteArray: Topic[] = [];
            const favTopic: FavoriteTopic = {
              id: document.payload.id,
              favoriteTopics: data.favoriteTopics
            };
            favTopic.favoriteTopics.forEach(topic => {
              favoriteArray.push(topic);
            });
            return favoriteArray;
          }
        })
      );
  }

  removeFavorites(topic: Topic, userUid: string) {
    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    return from(this.afs.collection('favoriteTopics').doc(userUid).update({
      favoriteTopics: arrayRemove(topic)
    }));
  }

  isFirstInArray(topicFirstId: string, catId: string): Observable<boolean> {
    return this.afs.collection('topics', ref => ref.orderBy('topicName').limit(1)
      .where('categoryId', '==', catId)).get().pipe(
      first(),
      map(query => {
        if (query.docs.length > 0) {
          return query.docs[0].id === topicFirstId;
        }
      })
    );
  }

  isLastInArray(topicLastId: string, catId: string): Observable<boolean> {
    return this.afs.collection('topics', ref => ref.orderBy('topicName', 'desc').limit(1)
      .where('categoryId', '==', catId)).get().pipe(
      first(),
      map(query => {
        if (query.docs.length > 0) {
          return query.docs[0].id === topicLastId;
        }
      })
    );
  }
}
