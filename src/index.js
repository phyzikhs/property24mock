import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { isLoaded, getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import fbConfig, {storage} from './config/fbConfig';

 // reactReduxFirebase(firebase, fbConfig) store enhancer no longer exists.
 // See 'react-redux-firebase': http://react-redux-firebase.com/docs/v3-migration-guide.html

const store = createStore( rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore, storage})),
    reduxFirestore(fbConfig), // redux bindings for firestore
    // reactReduxFirebase(firebase, fbConfig) // redux binding for firebase
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig, fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="center"> <p>Loading property24...</p></div>;
      return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
