import {Topic} from "../models/topic";

export interface CategoryRepository {

    updateCategoryTopics(topic: Topic): void;
}