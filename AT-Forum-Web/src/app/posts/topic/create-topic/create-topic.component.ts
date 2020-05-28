import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Topic} from '../../shared/topic';
import {UserState} from '../../../users/shared/user.state';
import {User} from '../../../users/shared/user';
import {CreateTopic} from '../shared/topic.action';
import {first, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {
  @Select(UserState.currentUser) user$: Observable<User>;
  newTopicForm: FormGroup;
  categoryId: string;
  constructor(private store: Store, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.newTopicForm = this.fb.group({
      topName: '',
      description: ''
    });
    this.categoryId = this.route.snapshot.paramMap.get('id');
  }

  CreateTopic() {
    this.user$.pipe(
      first(),
      map(user => {
        if (user) {
          const topicFromForm = this.newTopicForm.value;
          const newTopic = {
            topicName: topicFromForm.topName,
            description: topicFromForm.description,
            author: user,
            categoryId: this.categoryId
          };
          this.store.dispatch(new CreateTopic(newTopic as Topic));
          this.router.navigateByUrl('posts/category-details/' + this.categoryId);
        }
      })
    ).subscribe();
  }
}
