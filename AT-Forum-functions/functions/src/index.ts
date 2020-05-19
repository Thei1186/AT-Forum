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


exports.deleteTopicWhenCategoryDeleted = functions.firestore
    .document('categories/{id}')
    .onDelete((snap, context) => {
        return difa.getTopicController().deleteTopics(snap, context);
    });

exports.deleteCommentsWhenTopicDeleted = functions.firestore
    .document('topics/{id}')
    .onDelete((snap, context) => {
    return difa.getCommentController().deleteComments(snap, context);
    });

exports.removeCommentFromTopicWhenCommentDeleted = functions.firestore
    .document('comments/{id}')
    .onDelete((snap, context) => {
        return difa.getTopicController().removeCommentFromTopic(snap, context);
    });

exports.removeRoleWhenUserDeleted = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
       return difa.getRoleController().deleteRole(snap, context);
    });

exports.editCommentEditsTopicComments = functions.firestore
    .document('comments/{id}')
    .onUpdate((change, context) => {
       return difa.getTopicController().editTopicComments(change, context);
    });

