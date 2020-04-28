import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {Store} from '@ngxs/store';
import {SignUp} from '../../auth/shared/auth.action';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UploadsService} from '../../shared/uploads/uploads.service';

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
  photoURL: string;

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
    this.uService.upload(this.fileToUpload);
    const userFromForm = this.newSignUpForm.value;
    this.photoURL = this.uService.getFilePath();
    const newUser = {
      name: userFromForm.name,
      email: userFromForm.email,
      username: userFromForm.username,
      photoURL: this.photoURL,
      role: 'user'
    };
    this.password = this.newSignUpForm.get('password').value;
    this.store.dispatch(new SignUp(newUser as User, this.password));
    await this.router.navigateByUrl('/user/profile');
  }
}
