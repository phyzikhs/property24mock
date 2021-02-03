import { Component } from "react";
import { connect } from "react-redux";
import { isLoaded, isEmpty, firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import PropertyList from "../properties/PropertyList";
import Notifications from "./Notifications";

class Dashboard extends Component {
  render() {
    const {properties, auth, notifications} = this.props;
    // if (!isLoaded(auth)) return <span>Loading...</span>;
    return (!isEmpty(auth)) ? (
      <div className='dashboard container'>
        <div className="row">
          <div className="col s12 m6">
            <PropertyList properties={properties}/>
          </div>
          <div className="col s12 m6 offse-1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    ) : (
        <Redirect to='/login' />
      )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    properties: state.firestore.ordered.properties,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'properties'},
    { collection: 'notifications', limit: 3}
  ])
)(Dashboard);