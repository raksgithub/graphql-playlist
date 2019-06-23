import { SIGN_IN_USER, SIGN_OUT_USER } from '../constants/signIn';

interface SignIn {
    token: any;
}

export interface SignInAction extends SignIn {
    type: string;
}

const initialState: SignIn = {
    token: ''
}

export const signInReducer = (state: SignIn = initialState, action: SignInAction) => {
    switch(action.type) {
        case SIGN_IN_USER:
            return { ...state, token: action.token }; 
        case SIGN_OUT_USER:
            return { ...state, token: action.token };
        default:
            return state;
    }
}