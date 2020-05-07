import {UserRepository} from "./users/user.repository";
import {UserRepositoryFirebase} from "./users/user.repository.firebase";
import {UserController} from "./users/user.controller";
import {UserService} from "./users/user.service";
import {UserControllerFirebase} from "./users/user.controller.firebase";
import {CategoryController} from "./categories/category.controller";
import {CategoryRepository} from "./categories/category.repository";
import {CategoryRepositoryFirebase} from "./categories/category.repository.firebase";
import {CategoryService} from "./categories/category.service";
import {CategoryControllerFirebase} from "./categories/category.controller.firebase";

export class DependencyFactory {
    getUserController(): UserController {
        const repo: UserRepository = new UserRepositoryFirebase();
        const service: UserService = new UserService(repo);
        return new UserControllerFirebase(service);
    }

    getCategoryController(): CategoryController {
        const repo: CategoryRepository = new CategoryRepositoryFirebase();
        const service: CategoryService = new CategoryService(repo);
        return new CategoryControllerFirebase(service);
    }
}
