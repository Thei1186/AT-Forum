import {TopicRepository} from "./topic.repository";
import {FavoriteTopic} from "../models/favoriteTopic";
import {Topic} from "../models/topic";


export class TopicService {
    constructor(private topicRepository: TopicRepository) {
    }

    deleteTopicsWhenCategoryDeleted(catId: String): Promise<void> {
        if (catId === undefined || catId === '') {
            const error = new TypeError('Id has to be defined');
            return Promise.reject(error);
        }
        return this.topicRepository.deleteTopicsWhenCategoryDeleted(catId);
    }

    deleteFavoriteWhenTopicIsDeleted(topic: Topic) {
        return this.topicRepository.deleteFavoriteWhenTopicIsDeleted(topic);
    }

	updateTopicUpdateFavoriteTopic(favoriteTopicBefore: FavoriteTopic, favoriteTopicAfter: FavoriteTopic) {

    }
    /*

     updateTopicComments(comment: Comment): Promise<void> {
        return this.topicRepository.updateTopicComments(comment);
    }

   removeCommentFromTopic(comment: Comment, topicId: string): Promise<void> {
       if (comment === null)
       {
           const error = new TypeError('no comment found');
           return Promise.reject(error);
       }
       if (topicId === '' || topicId === undefined) {
           const error = new TypeError('topicId has to be defined');
           return Promise.reject(error);
       }
       return this.topicRepository.removeCommentFromTopic(comment, topicId);
   }


       editTopicComments(commentAfter: Comment, commentBefore: Comment) {
           return this.topicRepository.editTopicComments(commentAfter, commentBefore);
       }
    */


    
}
