import {UserRepository} from "./users/user.repository";
import {UserRepositoryFirebase} from "./users/user.repository.firebase";
import {UserController} from "./users/user.controller";
import {UserService} from "./users/user.service";
import {UserControllerFirebase} from "./users/user.controller.firebase";

export class DependencyFactory {
    getUserController(): UserController {
        const repo: UserRepository = new UserRepositoryFirebase();
        const service: UserService = new UserService(repo);
        return new UserControllerFirebase(service);
    }
}
