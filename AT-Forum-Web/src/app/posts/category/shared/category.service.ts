import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) {
  }

  createCategory(category: Category): Observable<Category> {
    return from(this.afs.collection('categories').add(category))
      .pipe(map(() => {
          return category;
        })
      );
  }

  getAllCategories(): Observable<Category[]> {
    return this.afs.collection<Category>('categories')
      .snapshotChanges().pipe(
        map(doc => {
          const catArray: Category[] = [];
          doc.forEach(document => {
            const category = document.payload.doc.data();
            console.log('id ' + document.payload.doc.id);
            catArray.push({
              id: document.payload.doc.id,
              categoryName: category.categoryName,
              description: category.description,
              topic: category.topic
            });
          });
          return catArray;
        })
      );
  }

  deleteCategory(id: string) {
    return from(this.afs.collection('categories').doc<Category>(id).delete());
  }

  editCategory(category: Category) {
    const userRef: AngularFirestoreDocument<Category> = this.afs.doc(`categories/${category.id}`);
    return from(userRef.set(category, {merge: true}))
      .pipe(map(() => {
        return category;
      }));
  }
}
