
export const createProperty = (property) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('properties').add({
      ...property,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      createdAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_PROPERTY_SUCCESS', property: property});
    }).catch(err => {
      dispatch({type: 'CREATE_PROPERTY_ERROR', err});
    })
  }
};