import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {Category} from '../category';
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
}
