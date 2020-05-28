import * as functions from 'firebase-functions';
import {DependencyFactory} from "./dependency-factory";
import * as admin from "firebase-admin";

const difa = new DependencyFactory();
const serviceAccount = require("../secret.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://at-forum.firebaseio.com'
});

exports.userDeleted = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
        return difa.getUserController().deletedUsers(snap, context);
    });

exports.deleteTopicsWhenCategoryDeleted = functions.firestore
    .document('categories/{id}')
    .onDelete((snap, context) => {
        return difa.getTopicController().deleteTopicsWhenCategoryDeleted(snap, context);
    });

exports.removeRoleWhenUserDeleted = functions.firestore
    .document('users/{uid}')
    .onDelete((snap, context) => {
        return difa.getRoleController().deleteRole(snap, context);
    });

exports.deleteTopicDeletesAllComments = functions.firestore
    .document('topics/{id}')
    .onDelete((snap, context) => {
        return difa.getCommentController().deleteCommentsFromTopic(snap, context);
    });

exports.updateUserUpdatesAuthor = functions.firestore
    .document('users/{uid}')
    .onUpdate((change, context) => {
        return difa.getUserController().updateUserUpdatesAuthor(change, context);
    });

exports.removeTopicFromFavoritesWhenTopicIsDeleted = functions.firestore
    .document('topics/{id}')
    .onDelete((snapshot, context) => {
       return difa.getTopicController().deleteFavoriteWhenTopicIsDeleted(snapshot, context);
    });

/*
These functions are no longer used

exports.updateTopicUpdateFavoriteTopic = functions.firestore
    .document('topics/{id}')
    .onUpdate((change, context) => {
        return difa.getTopicController().updateTopicUpdateFavoriteTopic(change, context);
    });
    
exports.removeTopicFromCategoryWhenTopicDeleted = functions.firestore
    .document('topics/{id}')
    .onDelete((snap, context) => {
        return difa.getCategoryController().removeTopicFromCategory(snap, context);
    });

exports.createTopicUpdatesCategory = functions.firestore
    .document('topics/{id}')
    .onCreate((snap, context) => {
        return difa.getCategoryController().addTopicToCategoryTopics(snap, context);
    });

exports.createCommentUpdatesTopic = functions.firestore
    .document('comments/{id}')
    .onCreate((snap, context) => {
        return difa.getTopicController().updateTopicComments(snap, context);
    });

exports.editCommentEditsTopicComments = functions.firestore
    .document('comments/{id}')
    .onUpdate((change, context) => {
       return difa.getTopicController().editTopicComments(change, context);
    });

exports.editTopicEditsCategoryTopics = functions.firestore
    .document('topics/{id}')
    .onUpdate(((change, context) => {
        return difa.getCategoryController().editCategoryTopics(change, context);
    }));
*/
