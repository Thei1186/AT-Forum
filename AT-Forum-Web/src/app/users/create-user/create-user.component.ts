import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {Store} from '@ngxs/store';
import {SignUp} from '../../auth/shared/auth.action';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UploadsService} from '../../shared/uploads/uploads.service';
import {finalize, first} from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newSignUpForm: FormGroup;
  password: string;
  hide = true;
  fileToUpload: File = null;

  constructor(private store: Store, private fb: FormBuilder,
              private router: Router, private uService: UploadsService) {
  }

  ngOnInit() {
    this.newSignUpForm = this.fb.group({
      email: '',
      username: '',
      name: '',
      password: '',
    });
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
  }

  async signUp() {
    if (this.fileToUpload != null) {
      this.signUpWithPicture();
    } else {
      this.signUpWithoutPicture();
    }
  }

  signUpWithoutPicture() {
    const userFromForm = this.newSignUpForm.value;
    const newUser = {
      name: userFromForm.name,
      email: userFromForm.email,
      username: userFromForm.username,
      photoURL: null
    };

    this.password = this.newSignUpForm.get('password').value;
    this.store.dispatch(new SignUp(newUser as User, this.password));
  }

  signUpWithPicture() {
    const timestamp = Date.now();
    this.uService.upload(timestamp.toString(), this.fileToUpload).pipe(
      finalize(() => {
        this.uService.getImageRefPath(timestamp.toString())
          .pipe(first()).subscribe(URL => {
          const userFromForm = this.newSignUpForm.value;
          const newUser = {
            name: userFromForm.name,
            email: userFromForm.email,
            username: userFromForm.username,
            photoURL: URL
          };

          this.password = this.newSignUpForm.get('password').value;
          this.store.dispatch(new SignUp(newUser as User, this.password));
        });
      })
    ).subscribe();
  }
}
