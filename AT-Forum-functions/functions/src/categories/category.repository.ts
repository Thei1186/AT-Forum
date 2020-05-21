import {Topic} from "../models/topic";


export interface CategoryRepository {

    addTopicToCategoryTopics(topic: Topic): Promise<void>;

    editCategoryTopics(topicBefore: Topic, topicAfter: Topic): Promise<void>;

    removeTopicFromCategory(topic: Topic): Promise<void>;
}
