export interface UserModel {
    id: number;
    username: string;
    email: string;
    bio?: string;
    avatar: string;
    avatar_uri: string;
    birthday: string;
    gender?: string;
    following?: boolean;
}

export interface UserResponseModel {
    profile: UserModel;
}