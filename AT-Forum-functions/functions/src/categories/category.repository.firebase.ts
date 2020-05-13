import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";
import * as admin from "firebase-admin";


export class CategoryRepositoryFirebase implements CategoryRepository {
    categoryPath = 'categories';

    async updateCategoryTopics(topic: Topic): Promise<void> {
        await this.db().collection(`${this.categoryPath}`).doc(`${topic.categoryId}`)
            .update({
                topics: admin.firestore.FieldValue.arrayUnion(topic)
            })
            .catch(err => {
                console.log(err.message);
            });
        return Promise.resolve();
    }

    db() {
        return admin.firestore();
    }

}
