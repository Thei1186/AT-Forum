import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";

export class CategoryService {
    constructor(private categoryRepository: CategoryRepository ) {

    }

    updateCategoryTopics(id: string, topic: Topic) {
        this.categoryRepository.updateCategoryTopics(id, topic);
    }
}
