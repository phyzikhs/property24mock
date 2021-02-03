
export const createProperty = (property) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorID = getState().firebase.auth.uid;
    firestore.collection('properties').add({
      ...property,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorID,
      createdAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_PROPERTY_SUCCESS', property: property});
      firestore.collection('notifications').add({
        content: 'Added a new listing',
        user: `${profile.firstName} ${profile.lastName}`,
        time: new Date ()
      }).then( doc => {
        console.log('Added a new listing', doc);
      }).catch( err => {
        console.log('New listng error', err);
      })
    }).catch(err => {
      dispatch({type: 'CREATE_PROPERTY_ERROR', err});
    })
  }
};