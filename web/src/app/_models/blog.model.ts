import { UserModel } from './user.model';

export interface BlogModel {
    author: UserModel;
    title: string;
    image: string;
    image_uri: string;
    description: string
    body: string;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
}

export interface BlogsListResponse {
    articles: BlogModel[];
}

export interface BlogResponse {
    article: BlogModel;
}
