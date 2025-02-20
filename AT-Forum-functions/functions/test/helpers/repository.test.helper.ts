import {IMock, Mock} from "moq.ts";

import {DataTestHelper} from "./data.test.helper";
import {TopicRepository} from "../../src/topics/topic.repository";
import {UserRepository} from "../../src/users/user.repository";
import {RoleRepository} from "../../src/roles/role.repository";

export class RepositoryTestHelper {
    constructor(private db: DataTestHelper) {}


    getTopicRepositoryMock(): IMock<TopicRepository> {
        return new Mock<TopicRepository>()
            .setup(repo => repo.deleteTopicsWhenCategoryDeleted(this.db.category1.id))
            .returns(Promise.resolve());
    }

    getUserRepositoryMock(): IMock<UserRepository> {
        return new Mock<UserRepository>()
            .setup(repo => repo.deleteUser(this.db.user1.uid))
            .returns(Promise.resolve())
            .setup(repo => repo.updateUserUpdatesAuthor(this.db.user1, this.db.user4))
            .returns(Promise.resolve());
    }

    getRoleRepositoryMock(): IMock<RoleRepository> {
        return new Mock<RoleRepository>()
            .setup(repo => repo.deleteRole(this.db.role1.uid))
            .returns(Promise.resolve());
    }
}
