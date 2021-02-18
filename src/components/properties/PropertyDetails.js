import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import PropertySlideshow from './PropertySlideshow';

class PropertyDetails extends Component {

  handleSubmit = (e) => {
    this.props.history.push('/')
  }
  render() {
  // const id = props.match.params.id;
  const { property, auth } = this.props;
  if (!auth.uid) return (
    <Redirect to='/' />
  )
  return (property) ? (
    <div className="row">
      <div className="row container section property-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{property.propertyName}</span>
            <p>{property.propertyAddress}</p>
            <p>R {property.price}</p>
          </div>
          <PropertySlideshow imageURLs={property.propertyImageURLs} />
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {property.authorFirstName} {property.authorLastName}</div>
            <div>{moment(property.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
      <div className="row container section notify-agent">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Contact the Agent</h5>
          <div className="input-field">
            <label htmlFor="title">Your name</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="content">Content</label>
            <textarea id="content" className="maretialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Send</button>
          </div>
        </form>
      </div>
    </div>
    
  ) : (
    <div className="container section property-details">Loading property details...</div>
  );
  }
  
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