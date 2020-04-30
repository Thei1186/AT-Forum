import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {User} from '../shared/user';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {finalize, first} from 'rxjs/operators';
import {UploadsService} from '../../shared/uploads/uploads.service';
import {EditUser} from '../shared/user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  password: string;
  fileToUpload: File = null;
  photoURL: string;
  uid: string;

  constructor(private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private  store: Store, private uService: UploadsService) {
  }

  @Select(UserState.currentUser) user$: Observable<User>;

  ngOnInit() {
    this.editUserForm = this.fb.group({
      name: '',
      username: '',
      password: ''
    });
    this.user$.subscribe(user => {
      if (!user) {
        return;
      }
      this.uid = user.uid;
      this.photoURL = user.photoURL;

      this.editUserForm.patchValue({
        name: user.name,
        username: user.username,
      });
    });
  }

  editProfile(user: User) {
    const newUser: User = {
      uid: user.uid,
      name: this.editUserForm.get('name').value,
      username: this.editUserForm.get('username').value,
      email: user.email,
      photoURL: this.photoURL
    };
    this.store.dispatch(new EditUser(newUser));
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    this.uService.upload(this.uid, this.fileToUpload).pipe(
      finalize(() => {
        this.uService.getImageRefPath(this.uid)
          .pipe(first()).subscribe(URL => {
          this.photoURL = URL;
        });
      })
    ).subscribe();
  }
}
