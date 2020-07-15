import { environment } from '../../environments/environment';
export const API = {
    LOGIN: `${environment.API_URL}/users/login`,
    REGISTER: `${environment.API_URL}/users/`,
    PROFILE: `${environment.API_URL}/profiles/`,
    USER: `${environment.API_URL}/user/`,
    SOCIALS: `${environment.API_URL}/auth/convert-token`,
    PASSWORD_RESET: `${environment.API_URL}/users/password_reset`,
    CHANGE_PASSWORD: `${environment.API_URL}/users/change-password`,

    ARTICLES: `${environment.API_URL}/articles`,
    TOP_ARTICLES: `${environment.API_URL}/top-articles`,
    TAGS: `${environment.API_URL}/tags`,
    UPLOAD_IMAGE: `${environment.API_URL}/upload/`
};
