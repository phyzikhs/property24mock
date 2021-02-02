
export const createProperty = (property) => {
  return (dispatch, getState) => {
    // make async call to database
    dispatch({ type: 'CREATE_PROPERTY', property });
  }
};