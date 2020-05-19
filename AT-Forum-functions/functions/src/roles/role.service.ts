import {RoleRepository} from "./role.repository";

export class RoleService {
    constructor(private roleRepository: RoleRepository) {

    }


    deleteRole(userId: string): Promise<void> {
        return this.roleRepository.deleteRole(userId);
    }
}
