import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";
import * as admin from "firebase-admin";

export class CategoryRepositoryFirebase implements CategoryRepository{
    categoryPath = 'categories';
    updateCategoryTopics(id: string, topic: Topic): void {
        this.db().collection(`${this.categoryPath}`).doc(`${id}`)
            .set(topic, {merge: true})
            .catch(err => {
                console.log(err.message);
            })
    }

    db() {
        return admin.firestore();
    }
}
