import {DataTestHelper} from "../helpers/data.test.helper";
import {RepositoryTestHelper} from "../helpers/repository.test.helper";
import {IMock} from "moq.ts/lib/moq";
import {It, Times} from "moq.ts";
import {RoleRepository} from "../../src/roles/role.repository";
import {RoleService} from "../../src/roles/role.service";

describe('RoleService', () => {
    let dataTestHelper: DataTestHelper;
    let repoTestHelper: RepositoryTestHelper;
    let roleRepository: IMock<RoleRepository>;
    let roleService: RoleService;
    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repoTestHelper = new RepositoryTestHelper(dataTestHelper);
        roleRepository = repoTestHelper.getRoleRepositoryMock();
        roleService = new RoleService(roleRepository.object());
    });

    it('Role Service needs a RoleRepository',  () => {
        const roleService = new RoleService(roleRepository.object());
        expect(roleService).toBe(roleService);
    });

    it('deleteRole is called only once', async () => {
        await roleService.deleteRole(dataTestHelper.role1.uid);
        roleRepository.verify(roleRepo => roleRepo.deleteRole(It.IsAny<string>()), Times.Exactly(1));
    });

    it('deleteRole should throw an exception if id is undefined', async () => {
        await expect(roleService.deleteRole('')).rejects.toThrow(TypeError);
        roleRepository.verify(roleRepo => roleRepo.deleteRole(It.IsAny<string>()), Times.Never());
    })
});
