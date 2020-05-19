import {RoleRepository} from "./role.repository";
import * as admin from "firebase-admin";

export class RoleRepositoryFirebase implements RoleRepository{
    async deleteRole(userId: string): Promise<void> {
        await this.db().collection('roles').doc(`${userId}`).delete()
            .then(() => {
                return Promise.resolve();
            })
            .catch((err) => {
                   return Promise.reject('Failed to delete role with message: ' + err.message)
            })
    }

    db() {
        return admin.firestore();
    }
}
