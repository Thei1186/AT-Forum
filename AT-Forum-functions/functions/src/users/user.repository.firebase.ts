import {UserRepository} from "./user.repository";
import * as admin from "firebase-admin";

export class UserRepositoryFirebase implements UserRepository {
    deleteUser(uid: string): Promise<any> {
        return this.auth().deleteUser(`${uid}`)
            .then(() => {
                console.log('The user with id: ' + uid + 'was deleted');
            }).catch((ex) => {
                console.log('Something went wrong: ' + ex.message)
            });
    }

    auth() {
        return admin.auth();
    }
}
