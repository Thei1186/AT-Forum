import {CategoryRepository} from "./category.repository";
import {Topic} from "../models/topic";
import * as admin from "firebase-admin";
import {Category} from "../models/category";


export class CategoryRepositoryFirebase implements CategoryRepository {
    categoryPath = 'categories';

    async addTopicToCategoryTopics(topic: Topic): Promise<void> {
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

    async editCategoryTopics(topicBefore: Topic, topicAfter: Topic): Promise<void> {
        const category = await this.db().collection(`${this.categoryPath}`).doc(`${topicBefore.categoryId}`).get();
        const categoryData = category.data() as Category;
        const topic = categoryData.topics.find(top => top.id === topicAfter.id) as Topic;
        topic.topicName = topicAfter.topicName;
        topic.description = topicAfter.description;
        await this.db().collection(`${this.categoryPath}`).doc(`${topicBefore.categoryId}`)
            .update({
               topics: categoryData.topics
            }).then(() => {
                return Promise.resolve();
            }).catch((err => {
                console.log(err.message);
            }));
    }

}
