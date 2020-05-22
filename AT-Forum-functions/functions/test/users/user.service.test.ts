import {DataTestHelper} from "../helpers/data.test.helper";
import {RepositoryTestHelper} from "../helpers/repository.test.helper";
import {IMock} from "moq.ts/lib/moq";
import {UserRepository} from "../../src/users/user.repository";
import {UserService} from "../../src/users/user.service";
import {Times} from "moq.ts";

describe('UserService', () => {
    let dataTestHelper: DataTestHelper;
    let repoTestHelper: RepositoryTestHelper;
    let userRepository: IMock<UserRepository>;
    let userService: UserService;
    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repoTestHelper = new RepositoryTestHelper(dataTestHelper);
        userRepository = repoTestHelper.getUserRepositoryMock();
        userService = new UserService(userRepository.object());
    });

    it('User Service needs a UserRepository',  () => {
        const userService = new UserService(userRepository.object());
        expect(userService).toBe(userService);
    });

    it('deleteTopicsWhenCategoryDeleted is called only once', async () => {
        await userService.deleteUser(dataTestHelper.user1.uid);
        userRepository.verify(userRepo => userRepo.deleteUser(dataTestHelper.user1.uid), Times.Exactly(1));
    });
    
});
