export interface UserModel {
    id: number;
    username: string;
    email: string;
    bio?: string;
    image: string;
    birthday: string;
    gender?: string;
}