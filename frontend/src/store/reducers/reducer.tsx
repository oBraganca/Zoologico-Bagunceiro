import { combineReducers } from 'redux'
import persistedApiTokenReducer from './authorizationReducer'; 

const reducer = combineReducers({  
   authUser:persistedApiTokenReducer,
})



export default reducer;