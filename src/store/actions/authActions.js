
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

export const updateUserProfile = (uid, newProfile) => {
  return (dispatch, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore.collection('users').doc(uid).set(
      newProfile,
      {merge: true}
    ).then(() => {
      dispatch({type: 'PROFILE_UPDATED'})
    }).catch(err => {
      dispatch({type: 'PROFILE_UPDATE_ERROR'}, err);
    });
  }
}

export const updateProfilePic = (image) => {
  // console.log(image);
  return (dispatch, getState, {getFirebase, getFirestore, storage}) => {
    // console.log(getState);
    const state = getState();
    const firebase = getFirebase();
    const firestore = getFirestore();
    // document.getElementById('progress-bar').style.visibility = 'visible';
    const uploadTask = storage.ref(`profiles/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        );
        console.log(progress);
        // document.getElementById('progress-status').style.width = progress+"%";
        // if (! progress<=100 ) document.getElementById('progress-status').style.color = 'green';
      },
      error => {
        console.log(error);
      },
      () => {
        storage.ref('profiles')
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // console.log("Image url: ", url);
          
          // add the url to the profile data (users)
          firestore.collection('users').doc(image.name).set(
            { profilePicURL: url },
            {merge: true}
          )
          // updateUserProfile(image.name, { profilePicURL: url }); // uid = file name
        }).then(() => {
          dispatch({type: 'PROFILE_PIC_UPLOADED'});
        }).catch(err => {
          dispatch({type: 'PROFILE_PIC_UPLOAD_ERROR', err})
        })
      }
    )
  }
}

export const deleteProfilePic = (name) => {
  return (dispatch, getState, {getFirebase, getFirestore, storage}) => {
    // console.log(getState);
    const state = getState();
    // console.log(state);
    const firebase = getFirebase();
    const firestore = getFirestore();
    const uploadTask = storage.ref(`profiles/${name}`).delete()
      .then(() => {
        // File deleted successfully
        firestore.collection('users').doc(name).set( // uid
          { profilePicURL: null },
          {merge: true}
        )
      }).then(() => {
        dispatch({type: 'PROFILE_PIC_DELETED'});
      }).catch(err => {
        dispatch({type: 'PROFILE_PIC_DELETE_ERROR', err})
      })
  }
}
