import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {User} from '../shared/user';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {finalize, first} from 'rxjs/operators';
import {UploadsService} from '../../shared/uploads/uploads.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  id: string;
  password: string;
  fileToUpload: File = null;
  photoURL: string;

  constructor(private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private  store: Store, private uService: UploadsService) { }

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
      this.editUserForm.patchValue({
        name: user.name,
        username: user.username,
      });
    });
  }

  editProfile(user: User) {
    const newUser = {
      uid: this.id,
      name: this.editUserForm.get('name').value,
      username: this.editUserForm.get('username').value,
    };

  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
  }

  changeProfilePic() {
    const timestamp = Date.now();
    this.uService.upload(timestamp.toString(), this.fileToUpload).pipe(
      finalize(() => {
        this.uService.getImageRefPath(timestamp.toString())
          .pipe(first()).subscribe(URL => {
            this.photoURL = URL;
        });
      })
    ).subscribe();
  }
}
