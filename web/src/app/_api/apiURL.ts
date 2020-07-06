import { environment } from '../../environments/environment';
export const API = {
    LOGIN: `${environment.API_URL}/users/login`,
    REGISTER: `${environment.API_URL}/users/`,
    PROFILE: `${environment.API_URL}/profiles/`,
    USER: `${environment.API_URL}/user/`,

    ARTICLES: `${environment.API_URL}/articles`,
    TOP_ARTICLES: `${environment.API_URL}/top-articles`,
    UPLOAD_IMAGE: `${environment.API_URL}/upload/`
};
