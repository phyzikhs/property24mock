import moment from 'moment';
import React from 'react'

const PropertySummary = ({property}) => {
  return (
    <div className="card z-depth-1 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{property.propertyName}</span>
        <img src={property.propertyImageURLs[0]} alt="Listing" className="summary-image" />
        <p>Posted by {property.authorFirstName} {property.authorLastName}</p>
        <p className="grey-text">{moment(property.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  );
}

export default PropertySummary;