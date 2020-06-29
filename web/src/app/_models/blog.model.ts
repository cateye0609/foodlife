import { UserModel } from './user.model';

export interface BlogModel {
    author: UserModel;
    title: string;
    description: string
    body: string;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
}