import {UserRepository} from "./users/user.repository";
import {UserRepositoryFirebase} from "./users/user.repository.firebase";
import {UserController} from "./users/user.controller";
import {UserService} from "./users/user.service";
import {UserControllerFirebase} from "./users/user.controller.firebase";
import {RoleRepository} from "./roles/role.repository";
import {RoleRepositoryFirebase} from "./roles/role.repository.firebase";
import {RoleService} from "./roles/role.service";
import {RoleControllerFirebase} from "./roles/role.controller.firebase";
import {CommentRepository} from "./comments/comment.repository";
import {CommentService} from "./comments/comment.service";
import {CommentControllerFirebase} from "./comments/comment.controller.firebase";
import {CommentRepositoryFirebase} from "./comments/comment.repository.firebase";
import {TopicControllerFirebase} from "./topics/topic.controller.firebase";
import {TopicService} from "./topics/topic.service";
import {TopicRepository} from "./topics/topic.repository";
import {TopicRepositoryFirebase} from "./topics/topic.repository.firebase";

export class DependencyFactory {
    getUserController(): UserController {
        const repo: UserRepository = new UserRepositoryFirebase();
        const service: UserService = new UserService(repo);
        return new UserControllerFirebase(service);
    }

    getRoleController() {
        const repo: RoleRepository = new RoleRepositoryFirebase();
        const service: RoleService = new RoleService(repo);
        return new RoleControllerFirebase(service)
    }

    getCommentController() {
        const repo: CommentRepository = new CommentRepositoryFirebase();
        const service: CommentService = new CommentService(repo);
        return new CommentControllerFirebase(service);
    }

    getTopicController() {
        const repo: TopicRepository = new TopicRepositoryFirebase();
        const service: TopicService = new TopicService(repo);
        return new TopicControllerFirebase(service);
    }

    /*
    getCategoryController(): CategoryController {
        const repo: CategoryRepository = new CategoryRepositoryFirebase();
        const service: CategoryService = new CategoryService(repo);
        return new CategoryControllerFirebase(service);
    }
     */

}
