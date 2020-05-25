import {DataTestHelper} from "../helpers/data.test.helper";
import {RepositoryTestHelper} from "../helpers/repository.test.helper";
import {IMock} from "moq.ts/lib/moq";
import {It, Times} from "moq.ts";
import {TopicRepository} from "../../src/topics/topic.repository";
import {TopicService} from "../../src/topics/topic.service";

describe('TopicService', () => {
    let dataTestHelper: DataTestHelper;
    let repoTestHelper: RepositoryTestHelper;
    let topicRepository: IMock<TopicRepository>;
    let topicService: TopicService;
    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repoTestHelper = new RepositoryTestHelper(dataTestHelper);
        topicRepository = repoTestHelper.getTopicRepositoryMock();
        topicService = new TopicService(topicRepository.object());
    });

    it('Topic Service needs a TopicRepository',  () => {
        const topicService = new TopicService(topicRepository.object());
        expect(topicService).toBe(topicService);
    });

    it('deleteTopicsWhenCategoryDeleted is called only once', async () => {
        await topicService.deleteTopicsWhenCategoryDeleted(It.IsAny<string>());
        topicRepository.verify(topRepo => topRepo.deleteTopicsWhenCategoryDeleted(It.IsAny<string>()), Times.Exactly(1));
    });

    it('deleteTopicsWhenCategoryDeleted should throw an exception if id is undefined', async () => {
        await expect(topicService.deleteTopicsWhenCategoryDeleted(dataTestHelper.category2.id)).rejects.toThrow(TypeError);
    })
});
