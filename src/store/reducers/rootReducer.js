import authReducer from './authReducer'
import { combineReducers } from 'redux'
import propertyReducer from './propertyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer
});

export default rootReducer;