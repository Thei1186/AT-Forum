import {RoleRepository} from "./role.repository";

export class RoleService {
    constructor(private roleRepository: RoleRepository) {}

    deleteRole(userId: string): Promise<void> {
        if (userId === '' || userId === undefined) {
            const error = new TypeError('Id has to be defined');
            return Promise.reject(error);
        }
        return this.roleRepository.deleteRole(userId);
    }
}
