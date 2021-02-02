
export const createProperty = (property) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    dispatch({ type: 'CREATE_PROPERTY', property });
  }
};