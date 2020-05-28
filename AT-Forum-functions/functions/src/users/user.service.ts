import {UserRepository} from "./user.repository";
import {User} from "../models/user";

export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    deleteUser(uid: string): Promise<void> {
        if (!uid.length) {
            const error = new TypeError('Id has to be defined')
          return Promise.reject(error);
        }
        return this.userRepository.deleteUser(uid);
    }

    updateUserUpdatesAuthor(userBefore: User, userAfter: User): Promise<User> {
        if (!userAfter.uid.length || !userBefore.uid.length) {
            const error = new TypeError('Email has to be defined');
            return Promise.reject(error);
        }

        if (!userBefore.email.length || !userAfter.email.length) {
            const error = new TypeError('Email has to be defined');
            return Promise.reject(error);
        }
        return this.userRepository.updateUserUpdatesAuthor(userBefore, userAfter);
    }
}
