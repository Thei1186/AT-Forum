import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {TopicService} from './topic.service';
import {CreateTopic, DeleteTopic, EditTopic, GetAllTopics, GetTopic} from './topic.action';
import {tap} from 'rxjs/operators';
import {GetAllTopicComments} from '../../comment/shared/comment.action';
import {Comment} from '../../shared/comment';

export class TopicStateModel {
  topics: Topic[];
  topic: Topic;
  topicComments: Comment[];
}

@State<TopicStateModel>({
  name: 'topic',
  defaults: {
    topics: [],
    topic: undefined,
    topicComments: []
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

  @Selector()
  static topicComments(state: TopicStateModel) {
    return state.topicComments;
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

  @Action(GetAllTopicComments)
  getAllTopicComments({getState, setState}: StateContext<TopicStateModel>, action: GetAllTopicComments) {
    return this.topicService.getAllTopicComments(action.id)
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            topicComments: result
          });
        })
      );
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

  @Action(DeleteTopic)
  deleteTopic({getState, setState}: StateContext<TopicStateModel>, action: DeleteTopic) {
    return this.topicService.deleteTopic(action.id)
      .pipe(
        tap(() => {
          const state = getState();
          const filteredArray = state.topics.filter(topic => topic.id !== action.id);
          setState({
            ...state,
            topics: filteredArray
          });
        })
      );
  }

  @Action(EditTopic)
  editTopic({getState, setState}: StateContext<TopicStateModel>, action: EditTopic) {
    return this.topicService.editTopic(action.topic)
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            topic: result
          });
        })
      );
  }
}
