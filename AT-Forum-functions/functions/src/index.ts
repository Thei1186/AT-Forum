import * as functions from 'firebase-functions';
import {DependencyFactory} from "./dependency-factory";
import * as admin from "firebase-admin";

const difa = new DependencyFactory();

admin.initializeApp({
    databaseURL: 'https://at-forum.firebaseio.com'
});

exports.userDeleted = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
        return difa.getUserController().deletedUsers(snap, context);
    });

exports.createTopicUpdatesCategory = functions.firestore
    .document('topics/{id}')
    .onCreate((snap, context) => {
        return difa.getCategoryController().updateCategoryTopics(snap, context);
    });

exports.createCommentUpdatesTopic = functions.firestore
    .document('comments/{id}')
    .onCreate((snap, context) => {
       return difa.getTopicController().updateTopicComments(snap, context);
    });

/*
exports.categoryDeleted = functions.firestore
    .document('categories/{id}')
    .onDelete((snap, context) => {
       return difa.getCategoryController().deleteCategory(snap, context);
    });
 */
