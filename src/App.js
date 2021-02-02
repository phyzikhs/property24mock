import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import PropertyDetails from './components/properties/PropertyDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProperty from "./components/properties/CreateProperty";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/property/:id' component={PropertyDetails} />
            <Route path='/login' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProperty} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
