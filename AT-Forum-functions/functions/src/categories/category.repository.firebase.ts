import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";
import * as admin from "firebase-admin";

export class CategoryRepositoryFirebase implements CategoryRepository{
    categoryPath = 'categories';
    updateCategoryTopics(topic: Topic): void {
        this.db().collection(`${this.categoryPath}`).doc(`${topic.categoryId}`)
            .update({
                topics: admin.firestore.FieldValue.arrayUnion(topic)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    db() {
        return admin.firestore();
    }
}
