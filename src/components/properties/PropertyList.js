import React from 'react'
import PropertySummary from './PropertySummary'


const PropertyList = ({properties}) => {
  return (
    <div className="project-list section">
      { properties && properties.map(property => {
        return (
          <PropertySummary property={property} key={property.id} />
        )
      })}
    </div>
  );
}

export default PropertyList;