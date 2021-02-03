import authReducer from './authReducer'
import { combineReducers } from 'redux'
import propertyReducer from './propertyReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  property: propertyReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;