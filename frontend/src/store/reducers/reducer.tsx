import { combineReducers } from 'redux'
import persistedApiTokenReducer from './authorizationReducer'; 
import persistedMatchReducer from './votingReducer'; 

const reducer = combineReducers({  
   authUser:persistedApiTokenReducer,
   math:persistedMatchReducer,
})



export default reducer;