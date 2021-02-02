import React from 'react'

const PropertyDetails = (props) => {
  const id = props.match.params.id;
  return (
    <div className="container section property-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Property title {id}</span>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit dolores amet architecto nemo molestiae doloremque perferendis facilis. A, minus sint dolores iste sequi, aperiam illo necessitatibus, molestias ullam nostrum assumenda.</p>

        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by Me</div>
          <div>2 February 2021, 2:58 PM</div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;