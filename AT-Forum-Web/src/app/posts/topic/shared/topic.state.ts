import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Topic} from '../../shared/topic';
import {TopicService} from './topic.service';
import {
  CreateTopic,
  DeleteTopic,
  EditTopic,
  GetAllTopicsFromCategory, GetTopicsFromCategoryWithPaging,
  GetFavorites,
  GetTopic,
  RemoveFavoriteTopic, GetNextTopicsFromCategoryWithPaging, GetPrevTopicsFromCategoryWithPaging, UpdateNavigation
} from './topic.action';
import {switchMap, tap} from 'rxjs/operators';
import {Logout} from '../../../auth/shared/auth.action';
import {Router} from '@angular/router';


export class TopicStateModel {
  topics: Topic[];
  topic: Topic;
  favoriteTopics: Topic[];
  isFirstTopic: boolean;
  isLastTopic: boolean;
}

@State<TopicStateModel>({
  name: 'topic',
  defaults: {
    topics: [],
    topic: undefined,
    favoriteTopics: [],
    isFirstTopic: false,
    isLastTopic: false
  }
})

@Injectable()
export class TopicState {
  constructor(private topicService: TopicService, private router: Router) {
  }

  @Selector()
  static topics(state: TopicStateModel) {
    return state.topics;
  }

  @Selector()
  static isFirstTopic(state: TopicStateModel) {
    return state.isFirstTopic;
  }

  @Selector()
  static isLastTopic(state: TopicStateModel) {
    return state.isLastTopic;
  }

  @Selector()
  static topic(state: TopicStateModel) {
    return state.topic;
  }

  @Selector()
  static favoriteTopics(state: TopicStateModel) {
    return state.favoriteTopics;
  }

  @Action(CreateTopic)
  createTopic({getState, setState}: StateContext<TopicStateModel>, action: CreateTopic) {
    return this.topicService.createTopic(action.topic);
  }

  @Action(GetAllTopicsFromCategory)
  getAllTopicsFromCategory({getState, setState}: StateContext<TopicStateModel>, action: GetAllTopicsFromCategory) {
    return this.topicService.getAllTopicsFromCategory(action.catId)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            topics: result
          });
        }));
  }

  @Action(GetTopicsFromCategoryWithPaging)
  getTopicsFromCategoryWithPaging({getState, setState}: StateContext<TopicStateModel>, action: GetTopicsFromCategoryWithPaging) {
    return this.topicService.getTopicsFromCategoryWithPaging(action.limit, undefined, action.catId)
      .pipe(
        tap((result) => {
          const state = getState();
          setState({
            ...state,
            topics: result
          });
        }));
  }

  @Action(GetNextTopicsFromCategoryWithPaging)
  getNextTopicsFromCategoryWithPaging({getState, setState, dispatch}: StateContext<TopicStateModel>, action: GetNextTopicsFromCategoryWithPaging) {
    const state = getState();
    return this.topicService.getTopicsFromCategoryWithPaging(action.limit, state.topics[state.topics.length - 1], action.catId)
      .pipe(
        tap((result) => {
          setState({
            ...state,
            topics: result
          });
          if (result.length > 0) {
            dispatch(new UpdateNavigation(result[0].id, result[result.length - 1].id, action.catId));
          }
        }));
  }



  @Action(UpdateNavigation)
  updateNavigation({getState, setState}: StateContext<TopicStateModel>, action: UpdateNavigation) {
    const state = getState();
    return this.topicService.isFirstInArray(action.topicFirstId, action.catId)
      .pipe(
        switchMap(start => {
          return this.topicService
            .isLastInArray(action.topicLastId, action.catId)
            .pipe(
              tap(end => {
                setState({
                  ...state,
                  isFirstTopic: start,
                  isLastTopic: end
                });
              })
            );
        })
      );
  }

  @Action(GetPrevTopicsFromCategoryWithPaging)
  getPrevTopicsFromCategoryWithPaging({getState, setState, dispatch}: StateContext<TopicStateModel>, action: GetPrevTopicsFromCategoryWithPaging) {
    const state = getState();
    return this.topicService.getPrevTopicsFromCategoryWithPaging(action.limit, state.topics[0], action.catId)
      .pipe(
        tap((result) => {
          setState({
            ...state,
            topics: result
          });
          if (result.length > 0) {
            dispatch(new UpdateNavigation(result[0].id, result[result.length - 1].id, action.catId));
          }
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
          this.router.navigateByUrl('posts/category-details/' + result.categoryId);
        })
      );
  }

  @Action(GetFavorites)
  getFavorites({getState, setState}: StateContext<TopicStateModel>, action: GetFavorites) {
    return this.topicService.getFavorites(action.id)
      .pipe(tap((result) => {
          const state = getState();
          setState({
            ...state,
            favoriteTopics: result
          });
        })
      );
  }

  @Action(Logout)
  logout({setState}: StateContext<TopicStateModel>) {
    setState({
      topics: [],
      topic: undefined,
      favoriteTopics: [],
      isLastTopic: false,
      isFirstTopic: false
    });
  }

  @Action(RemoveFavoriteTopic)
  removeFavoriteTopic({getState, setState}: StateContext<TopicStateModel>, action: RemoveFavoriteTopic) {
    return this.topicService.removeFavorites(action.topic, action.userUid)
      .pipe(
        tap(() => {
          const state = getState();
          const filteredArray = state.favoriteTopics.filter(topic => topic.id !== action.topic.id);
          setState({
            ...state,
            favoriteTopics: filteredArray
          });
        })
      );
  }
}
