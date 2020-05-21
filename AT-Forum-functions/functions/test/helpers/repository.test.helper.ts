import {IMock, Mock} from "moq.ts";
import {CategoryRepository} from "../../src/categories/category.repository";
import {DataTestHelper} from "./data.test.helper";

export class RepositoryTestHelper {
    constructor(private db: DataTestHelper) {}



    getCategoryRepositoryMock(): IMock<CategoryRepository> {
        return new Mock<CategoryRepository>()
            .setup(repo => repo.addTopicToCategoryTopics(this.db.topic1))
            .returns(Promise.resolve())
            .setup(repo => repo.removeTopicFromCategory(this.db.topic2))
            .returns(Promise.resolve())
            .setup(repo => repo.editCategoryTopics(this.db.topic3, this.db.topic4))
            .returns(Promise.resolve());

    }
}
