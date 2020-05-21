import {CategoryController} from "./category.controller";
import {CategoryService} from "./category.service";
import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Topic} from "../models/topic";


export class CategoryControllerFirebase implements CategoryController {
    constructor(private categoryService: CategoryService) {

    }

    addTopicToCategoryTopics(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const topic = snap.data() as Topic;
        topic.id = context.params.id;
        return this.categoryService.addTopicToCategoryTopics(topic);
    }

    editCategoryTopics(change: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const topicBefore = change.before.data() as Topic;
        topicBefore.id = context.params.id;
        const topicAfter = change.after.data() as Topic;
        topicAfter.id = context.params.id;

        return this.categoryService.editCategoryTopics(topicBefore, topicAfter);
    }

    removeTopicFromCategory(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const topic = snap.data() as Topic;
        topic.id = context.params.id;
        const categoryId = topic.categoryId;
        return this.categoryService.removeTopicFromCategory(topic, categoryId);
    }

}
