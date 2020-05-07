import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
  }

}
