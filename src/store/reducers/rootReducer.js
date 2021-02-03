import authReducer from './authReducer'
import { combineReducers } from 'redux'
import propertyReducer from './propertyReducer';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  firestore: firestoreReducer
});

export default rootReducer;