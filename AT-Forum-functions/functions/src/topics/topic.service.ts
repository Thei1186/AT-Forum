import {Comment} from "../models/comment";
import {TopicRepository} from "./topic.repository";

export class TopicService {
    constructor(private topicRepository: TopicRepository) {
    }

    updateTopicComments(comment: Comment): Promise<void> {
        return this.topicRepository.updateTopicComments(comment);
    }

    deleteTopics(catId: String) {
       return this.topicRepository.deleteTopics(catId);
    }
}
