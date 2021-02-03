import React from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';

const PropertyDetails = (props) => {
  // const id = props.match.params.id;
  const { property, auth } = props;
  if (!auth.uid) return (
    <Redirect to='/' />
  )
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
          <div>{moment(property.createdAt.toDate()).calendar()}</div>
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
    property: property,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'properties'}
  ])
)(PropertyDetails);