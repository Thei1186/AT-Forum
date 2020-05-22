import {User} from "../models/user";

export interface UserRepository {
    deleteUser(uid: string): Promise<any>;

    updateUserUpdatesAuthor(userBefore: User, userAfter: User): Promise<User>;
}
