import {UserRepository} from "./user.repository";
import {User} from "../models/user";

export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    deleteUser(uid: string): Promise<void> {
        return this.userRepository.deleteUser(uid);
    }

    updateUserUpdatesAuthor(userBefore: User, userAfter: User): Promise<User> {
        return this.userRepository.updateUserUpdatesAuthor(userBefore, userAfter);
    }
}
