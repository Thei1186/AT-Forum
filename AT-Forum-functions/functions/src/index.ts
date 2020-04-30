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
