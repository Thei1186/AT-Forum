import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {TopicState} from '../shared/topic.state';
import {Observable} from 'rxjs';
import {Topic} from '../../shared/topic';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
@Select(TopicState.topic) topic$: Observable<Topic>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCreateComment(id: any) {
    this.router.navigateByUrl('posts/create-comment' + id);
  }
}
