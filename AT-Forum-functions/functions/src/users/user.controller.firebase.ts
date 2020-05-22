import {UserController} from "./user.controller";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Change, EventContext} from "firebase-functions";
import {UserService} from "./user.service";
import {User} from "../models/user";

export class UserControllerFirebase implements UserController {
    constructor(private userService: UserService) {
    }

    deletedUsers(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        return this.userService.deleteUser(context.params.uid);
    }

    updateUserUpdatesAuthor(change: Change<DocumentSnapshot>, context: EventContext): Promise<User> {
        const userBefore = change.before.data() as User;
        userBefore.uid = context.params.uid;
        const userAfter = change.after.data() as User;
        userAfter.uid = context.params.uid;
        console.log(context.params.uid);
        return this.userService.updateUserUpdatesAuthor(userBefore, userAfter);
    }
}
