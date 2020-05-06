import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Topic} from '../topic';
import {TopicService} from '../services/topic.service';
import {CreateTopic, GetAllTopics} from './topic.action';
import {tap} from 'rxjs/operators';

export class CategoryStateModel {
  topics: Topic[];
}

@State<CategoryStateModel>({
  name: 'topic',
  defaults: {
    topics: []
  }
})

@Injectable()
export class CategoryState {
  constructor(private topicService: TopicService) {
  }

  @Selector()
  static topics(state: CategoryStateModel) {
    return state.topics;
  }

  @Action(CreateTopic)
  createTopic({getState, setState}: StateContext<CategoryStateModel>, action: CreateTopic) {
    return this.topicService.createTopic(action.topic);
  }

  @Action(GetAllTopics)
  getAllTopics({getState, setState}: StateContext<CategoryStateModel>) {
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
