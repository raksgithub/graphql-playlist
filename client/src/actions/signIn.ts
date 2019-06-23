import { SIGN_IN_USER } from '../constants/signIn';
import { SignInAction } from '../reducers/signIn'; 

export const signIn = (token: string): SignInAction => ({
    type: SIGN_IN_USER,
    token
});