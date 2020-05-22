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
            throw new TypeError('Id has to be defined');
        }

        return this.topicRepository.deleteTopicsWhenCategoryDeleted(catId);
    }

    removeCommentFromTopic(comment: Comment, topicId: string) {
        return this.topicRepository.removeCommentFromTopic(comment, topicId);
    }

    /*
        editTopicComments(commentAfter: Comment, commentBefore: Comment) {
            return this.topicRepository.editTopicComments(commentAfter, commentBefore);
        }
     */

}
