import { Component } from "react";
import PropertyList from "../properties/PropertyList";
import Notifications from "./Notifications";

class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard container'>
        <div className="row">
          <div className="col s12 m6">
            <PropertyList />
          </div>
          <div className="col s12 m6 offse-1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;