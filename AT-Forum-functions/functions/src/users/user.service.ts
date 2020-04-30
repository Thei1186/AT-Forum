import {UserRepository} from "./user.repository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    deleteUser (uid: string): Promise<void> {
        return this.userRepository.deleteUser(uid);
    }
}
