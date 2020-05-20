import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";


export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {

    }

    addTopicToCategoryTopics(topic: Topic): Promise<void> {
        return this.categoryRepository.addTopicToCategoryTopics(topic);
    }

    editCategoryTopics(topicBefore: Topic, topicAfter: Topic) {
        return this.categoryRepository.editCategoryTopics(topicBefore, topicAfter);
    }
}
