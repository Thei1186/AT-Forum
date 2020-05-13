import { Component, OnInit } from '@angular/core';
import {TopicState} from '../shared/topic.state';
import {Observable} from 'rxjs';
import {Topic} from '../../shared/topic';
import {Select, Store} from '@ngxs/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EditTopic, GetTopic} from '../shared/topic.action';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
  @Select(TopicState.topic) topic$: Observable<Topic>;

  editTopicForm: FormGroup;
  id: string;

  constructor(private store: Store, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editTopicForm = this.fb.group({
      topicName: '',
      description: ''
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetTopic(this.id));
    this.topic$.subscribe(topic => {
      if (!topic) {
        return;
      }
      this.editTopicForm.patchValue({
        topicName: topic.topicName,
        description: topic.description,
      });
    });
  }

  editTopic(topic: Topic) {
    const newTopic: Topic = {
      id: topic.id,
      topicName: this.editTopicForm.get('topicName').value,
      description: this.editTopicForm.get('description').value,
      comments: topic.comments,
      author: topic.author
    };
    console.log(topic);
    this.store.dispatch(new EditTopic(newTopic));
  }
}
