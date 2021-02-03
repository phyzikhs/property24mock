import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const PropertyDetails = (props) => {
  // const id = props.match.params.id;
  const { property } = props;
  return (property) ? (
    <div className="container section property-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{property.propertyName}</span>
          <p>{property.propertyAddress}</p>
          <p>R {property.price}</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {property.authorFirstName} {property.authorLastName}</div>
          <div>2 February 2021, 2:58 PM</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container section property-details">Loading property details...</div>
  );
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const properties = state.firestore.data.properties
  const property = properties ? properties[id] : null
  return {
    property: property
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'properties'}
  ])
)(PropertyDetails);