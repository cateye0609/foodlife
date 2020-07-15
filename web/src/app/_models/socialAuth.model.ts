export class ClientAuth {
    static client_id = 'TxR3TEuNEyHMpmQ0GriCZMfYdCHEEi0Kdg0XA5B0';
    static client_secret = 'DkfQwXFWkRn4BYjpRbEe7GwB9dHd0te9Q9Btx42weaFsdCYIL1bPkNvs6CEi4hExYEVEpP8miDaGgpKA2T0Q3TDWsciMSTtFxzc147l0tNP27BuxKgDIpUCMhPOP99zb';
}
export interface SocialAuthResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
}
export interface SocialUserModel {
    avatar?: string;
    bio?: string;
    birthday: string;
    email: string;
    gender: string;
    token: string
    username: string;
}
export interface SocialUserResponse {
    user: SocialUserModel;
}