import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private storage: AngularFireStorage) {
  }

  public upload(id: string, data): Observable<UploadTaskSnapshot> {

    const filePath = `images/${id}`;
    const task = this.storage.upload(filePath, data);

    return task.snapshotChanges();
  }

  public getImageRefPath(id: string) {
    const filePath = `images/${id}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL();
  }
}
