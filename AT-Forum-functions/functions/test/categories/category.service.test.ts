import {DataTestHelper} from "../helpers/data.test.helper";
import {RepositoryTestHelper} from "../helpers/repository.test.helper";
import {IMock} from "moq.ts/lib/moq";
import {CategoryRepository} from "../../src/categories/category.repository";
import {CategoryService} from "../../src/categories/category.service";
import {Times} from "moq.ts";

describe('CategoryService', () => {
    let dataTestHelper: DataTestHelper;
    let repoTestHelper: RepositoryTestHelper;
    let categoryRepository: IMock<CategoryRepository>;
    let categoryService: CategoryService;
    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repoTestHelper = new RepositoryTestHelper(dataTestHelper);
        categoryRepository = repoTestHelper.getCategoryRepositoryMock();
        categoryService = new CategoryService(categoryRepository.object());
    });

    it('Category Service needs a CategoryRepository',  () => {
        const catRepository = new CategoryService(categoryRepository.object());
        expect(catRepository).toBe(catRepository);
    });

    it('addTopicToCategoryTopics is called only once', async () => {
        await categoryService.addTopicToCategoryTopics(dataTestHelper.topic1);
        categoryRepository.verify(catRepo => catRepo.addTopicToCategoryTopics(dataTestHelper.topic1), Times.Exactly(1));
    });

    it('editCategoryTopics is called only once', async () => {
        await categoryService.editCategoryTopics(dataTestHelper.topic3,dataTestHelper.topic4);
        categoryRepository.verify(catRepo => catRepo.editCategoryTopics(dataTestHelper.topic3,dataTestHelper.topic4), Times.Exactly(1));
    });

    it('removeTopicFromCategory is called only once', async () => {
        await categoryService.removeTopicFromCategory(dataTestHelper.topic2);
        categoryRepository.verify(catRepo => catRepo.removeTopicFromCategory(dataTestHelper.topic2), Times.Exactly(1));
    });
});
