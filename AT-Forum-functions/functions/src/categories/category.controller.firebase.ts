import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Topic} from "../models/topic";


export class CategoryControllerFirebase implements CategoryController{
    constructor(private categoryService: CategoryService) {

    }

    updateCategoryTopics(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const topic = snap.data() as Topic;
        topic.id = context.params.id;
      return this.categoryService.updateCategoryTopics(topic);
    }
}
