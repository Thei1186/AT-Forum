import {UserController} from "./user.controller";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";
import {UserService} from "./user.service";

export class UserControllerFirebase implements UserController {
    constructor(private userService: UserService) {}

    deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        return this.userService.deleteUser(context.params.uid);
    }
}
