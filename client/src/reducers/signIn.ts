import { SIGN_IN_USER } from '../constants/signIn';

interface SignIn {
    token: string;
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
        default:
            return state;
    }
}