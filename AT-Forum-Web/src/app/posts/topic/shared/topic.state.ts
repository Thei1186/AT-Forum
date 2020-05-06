import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {TopicService} from './topic.service';
import {CreateTopic, GetAllTopics} from './topic.action';
import {tap} from 'rxjs/operators';

export class TopicStateModel {
  topics: Topic[];
}

@State<TopicStateModel>({
  name: 'topic',
  defaults: {
    topics: []
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
}
