import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions/actionsType";


type ROOT_INITIAL_STATE ={
    authChecked: false;
    loggedIn: false;
    currentUser: {}
};

const INITIAL_STATE:ROOT_INITIAL_STATE = {
    authChecked: false,
    loggedIn: false,
    currentUser: {}
};

export default function authorizationReducer(state= INITIAL_STATE, action:any) {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                authChecked: true,
                loggedIn: true,
                currentUser: action.payload,
            };
        case NOT_AUTHENTICATED:
            return {
                authChecked: true,
                loggedIn: false,
                currentUser: {}
            };
        default:
            return state;
    }      
}