import {Topic} from "../models/topic";

export interface CategoryRepository {

    updateCategoryTopics(id: string, topic: Topic): void;
}
