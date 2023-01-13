import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions/actionsType";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// type ROOT_INITIAL_STATE ={
//     authChecked: false;
//     loggedIn: false;
//     currentUser: {}
// };

const INITIAL_STATE = {
    authChecked: false,
    loggedIn: false,
    currentUser: {}
};

const persistConfigToken = {
    key: 'authUser', // O nome da chave usada para armazenar o estado no localStorage
    storage, // Usa o localStorage como o armazenamento padrão
};

const authorizationReducer = (state= INITIAL_STATE, action:any) => {
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
const persistedApiTokenReducer = persistReducer(persistConfigToken, authorizationReducer);
export default persistedApiTokenReducer;