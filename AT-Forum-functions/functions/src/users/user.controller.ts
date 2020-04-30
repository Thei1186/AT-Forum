import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface UserController {
    deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void>;

}
