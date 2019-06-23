import { SIGN_IN_USER, SIGN_OUT_USER } from '../constants/signIn';
import { SignInAction } from '../reducers/signIn'; 

export const signIn = (token: string): SignInAction => ({
    type: SIGN_IN_USER,
    token
});

export const signOut = (): SignInAction => ({
    type: SIGN_OUT_USER,
    token: null
})