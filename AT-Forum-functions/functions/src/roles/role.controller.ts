import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export interface RoleController {
    deleteRole(snap: DocumentSnapshot, context: EventContext): Promise<void>;
}
