import reducer from './reducers/reducer'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';

const store = createStore(reducer);
export default store 

export const persistor = persistStore(store);
