import {Comment} from "../models/comment";
import {TopicRepository} from "./topic.repository";


export class TopicService {
    constructor(private topicRepository: TopicRepository) {
    }

    updateTopicComments(comment: Comment): Promise<void> {
        return this.topicRepository.updateTopicComments(comment);
    }

    deleteTopicsWhenCategoryDeleted(catId: String): Promise<void> {
        if (catId === undefined || catId === '') {
            const error = new TypeError('Id has to be defined');
           return Promise.reject(error);
        }

        return this.topicRepository.deleteTopicsWhenCategoryDeleted(catId);
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

    /*
        editTopicComments(commentAfter: Comment, commentBefore: Comment) {
            return this.topicRepository.editTopicComments(commentAfter, commentBefore);
        }
     */

}
