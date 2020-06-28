import { environment } from '../../environments/environment';
export const API = {
    LOGIN: `${environment.API_URL}/users/login`,
    REGISTER: `${environment.API_URL}/users/`,
    PROFILE: `${environment.API_URL}/profiles/`
};
