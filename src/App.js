import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withTracker } from "./components/common";

import EventsList from "./components/EventsList";
// import EventsByTag from "./components/EventsByTag";
import EventListing from "./components/EventListing";

import "./App.css";

// import createBrowserHistory from 'history/createBrowserHistory'
// import initGa from './ga';
// const history = createBrowserHistory();
// initGa(history);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="main">
            <Route
              exact
              path={"/" + process.env.REACT_APP_BASE_URL + "/:page?"}
              component={withTracker(EventsList)}
            />
            <Route
              exact
              path={"/" + process.env.REACT_APP_BASE_URL + "/build"}
              component={withTracker(EventsList)}
            />
            <Route
              exact
              path={"/" + process.env.REACT_APP_SINGLE_URL + "/:slug?"}
              component={withTracker(EventListing)}
            />
            <Route
              path={
                "/" +
                process.env.REACT_APP_BASE_URL +
                "/" +
                process.env.REACT_APP_TAG_URL +
                "/:tag?"
              }
              component={withTracker(EventsList)}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;