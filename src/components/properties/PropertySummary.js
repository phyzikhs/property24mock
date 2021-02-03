import React from 'react'

const PropertySummary = ({property}) => {
  return (
    <div className="card z-depth-1 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{property.propertyName}</span>
        <p>Posted by {property.authorFirstName} {property.authorLastName}</p>
        <p className="grey-text">3rd September, 2am</p>
      </div>
    </div>
  );
}

export default PropertySummary;