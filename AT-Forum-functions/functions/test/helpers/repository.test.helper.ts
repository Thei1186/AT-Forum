import {IMock, Mock} from "moq.ts";

import {DataTestHelper} from "./data.test.helper";
import {TopicRepository} from "../../src/topics/topic.repository";

export class RepositoryTestHelper {
    constructor(private db: DataTestHelper) {}


    getTopicRepositoryMock(): IMock<TopicRepository> {
        return new Mock<TopicRepository>()
            .setup(repo => repo.deleteTopicsWhenCategoryDeleted(this.db.category1.id))
            .returns(Promise.resolve());
    }
}
