
export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'})
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      // dispatch({type: 'SIGNUP_SUCCESS'})
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0]+newUser.lastName[0]
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'});
      firestore.collection('notifications').add({
        content: 'Joined the party',
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: new Date ()
      }).then( doc => {
        console.log('Joined the party', doc);
      }).catch( err => {
        console.log('New user error', err);
      })
    }).catch(err => {
      dispatch({type: 'SIGNUP_ERROR', err})
    })
  }
}