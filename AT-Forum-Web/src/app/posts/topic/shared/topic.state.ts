import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {TopicService} from './topic.service';
import {CreateTopic, GetAllTopics, GetTopic} from './topic.action';
import {tap} from 'rxjs/operators';

export class TopicStateModel {
  topics: Topic[];
  topic: Topic;
}

@State<TopicStateModel>({
  name: 'topic',
  defaults: {
    topics: [],
    topic: undefined
  }
})

@Injectable()
export class TopicState {
  constructor(private topicService: TopicService) {
  }

  @Selector()
  static topics(state: TopicStateModel) {
    return state.topics;
  }

  @Selector()
  static topic(state: TopicStateModel) {
    return state.topic;
  }

  @Action(CreateTopic)
  createTopic({getState, setState}: StateContext<TopicStateModel>, action: CreateTopic) {
    return this.topicService.createTopic(action.topic);
  }

  @Action(GetAllTopics)
  getAllTopics({getState, setState}: StateContext<TopicStateModel>) {
    return this.topicService.getAllTopics()
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            topics: result
          });
        }));
  }

  @Action(GetTopic)
  getTopic({getState, setState}: StateContext<TopicStateModel>, action: GetTopic) {
    return this.topicService.getTopic(action.id)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            topic: result
          });
        })
      );
  }
}
