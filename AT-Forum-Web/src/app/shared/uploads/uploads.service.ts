import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {
  downloadURL: Observable<string>;
  filepath: string;

  constructor(private storage: AngularFireStorage) {
  }

  public upload(data) {
    const timestamp = Date.now();
    const filePath = `images/${timestamp}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, data);

    return task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              console.log('subscribe url: ' + url);
              this.filepath = url;
            }
          });
        })
      );
  }

  public getFilePath(): string {
    if (this.filepath != null) {
      return this.filepath;
    }
    return null;
  }
}
