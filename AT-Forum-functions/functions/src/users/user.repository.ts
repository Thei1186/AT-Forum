export interface UserRepository {
    deleteUser(uid: string): Promise<any>;
}
