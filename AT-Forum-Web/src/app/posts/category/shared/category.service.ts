import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Category} from '../../shared/category';
import {map} from 'rxjs/operators';
import {User} from "../../../users/shared/user";

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
}
