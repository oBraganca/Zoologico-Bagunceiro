import { NO_HAS_ANIMAL, HAS_ANIMAL } from "../actions/actionsType";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const INITIAL_STATE = {
    asAnimal: false,
    animal: {}
};

const persistUserMatch = {
    key: 'matchReducer', // O nome da chave usada para armazenar o estado no localStorage
    storage, // Usa o localStorage como o armazenamento padrão
};

const matchReducer = (state= INITIAL_STATE, action:any) => {
    switch (action.type) {
        case HAS_ANIMAL:
            return {
                asAnimal: true,
                animal: action.payload
            };
        case NO_HAS_ANIMAL:
            return {
                asAnimal: false,
                animal: action.payload
            };

        default:
            return state;
    }      
}
const persistedMatchReducer = persistReducer(persistUserMatch, matchReducer);
export default persistedMatchReducer;