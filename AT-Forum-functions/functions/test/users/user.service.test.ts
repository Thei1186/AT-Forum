import {DataTestHelper} from "../helpers/data.test.helper";
import {RepositoryTestHelper} from "../helpers/repository.test.helper";
import {IMock} from "moq.ts/lib/moq";
import {UserRepository} from "../../src/users/user.repository";
import {UserService} from "../../src/users/user.service";
import {It, Times} from "moq.ts";

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

    it('deleteUser is called only once', async () => {
        await userService.deleteUser(dataTestHelper.user1.uid);
        userRepository.verify(userRepo => userRepo.deleteUser(dataTestHelper.user1.uid), Times.Exactly(1));
    });

    it('updateUserUpdatesAuthor is called only once', async () => {
        await userService.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user4);
        userRepository.verify(userRepo => userRepo.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user4), Times.Exactly(1));
    });

    it('updateUserUpdatesAuthor throws an exception if either user object does not have an id', async () => {
        await expect(userService.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user2)).rejects.toThrow(TypeError);
        await expect(userService.updateUserUpdatesAuthor(dataTestHelper.user2, dataTestHelper.user1)).rejects.toThrow(TypeError);
        userRepository.verify(userRepo => userRepo.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user3), Times.Never());
    });

    it('updateUserUpdatesAuthor throws an exception if either user object does not have an email', async () => {
        await expect(userService.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user3)).rejects.toThrow(TypeError);
        await expect(userService.updateUserUpdatesAuthor(dataTestHelper.user3, dataTestHelper.user1)).rejects.toThrow(TypeError);
        userRepository.verify(userRepo => userRepo.updateUserUpdatesAuthor(dataTestHelper.user1, dataTestHelper.user3), Times.Never());
    });

    it('deleteUser throws an exception if called with invalid id', async () => {
        await expect(userService.deleteUser(dataTestHelper.user2.uid)).rejects.toThrow(TypeError);
        await expect(userService.deleteUser(It.IsAny<undefined>())).rejects.toThrow(TypeError);
        await userRepository.verify(userRepo => userRepo.deleteUser(dataTestHelper.user2.uid), Times.Never());
    })
    
});
