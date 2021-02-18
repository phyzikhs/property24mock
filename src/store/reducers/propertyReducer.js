
const initState = {
  properties: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

const propertyReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROPERTY_SUCCESS':
      console.log('created property', action.property);
      return state;
    case 'CREATE_PROPERTY_ERROR':
      console.log('create project error', action.err);
      return state;
    case 'PROPERTY_PIC_UPLOADED':
      console.log('Photo uploaded.');
    default:
      // console.log("Ran into default reducer", action);
      return state;
  }
};

export default propertyReducer;
