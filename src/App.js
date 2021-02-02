import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import PropertyDetails from './components/properties/PropertyDetails'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/property/:id' component={PropertyDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
