export interface RoleRepository {

    deleteRole(userId: string): Promise<void>;
}
