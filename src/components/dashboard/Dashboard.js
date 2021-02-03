import { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import PropertyList from "../properties/PropertyList";
import Notifications from "./Notifications";

class Dashboard extends Component {
  render() {

    const {properties} = this.props;
    return (
      <div className='dashboard container'>
        <div className="row">
          <div className="col s12 m6">
            <PropertyList properties={properties}/>
          </div>
          <div className="col s12 m6 offse-1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    properties: state.firestore.ordered.properties
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'properties'}
  ])
)(Dashboard);