import {RoleController} from "./role.controller";
import {RoleService} from "./role.service";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";

export class RoleControllerFirebase implements RoleController{
    constructor(private roleService: RoleService) {

    }


    deleteRole(snap: DocumentSnapshot, context: EventContext): Promise<void> {
        const userId = context.params.uid;
        return this.roleService.deleteRole(userId);
    }
}
