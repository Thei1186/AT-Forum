import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from "firebase-functions";
import {User} from "../models/user";

export interface UserController {
    deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void>;

    updateUserUpdatesAuthor(change: Change<DocumentSnapshot>, context: EventContext): Promise<User>;
}
