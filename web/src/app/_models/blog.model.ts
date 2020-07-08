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

export interface BlogCommentModel {
    comments: CommentModel[];
    commentsCount: number;
}

export interface CommentModel {
    author: UserModel;
    body: string;
    createdAt: string;
    updatedAt: string;
    id: number;
}

export interface TopBlogModel {
    article: {
        top_like: BlogModel[];
        top_comment: BlogModel[]
    };
}

export interface TagModel {
    tags: string[];
}
