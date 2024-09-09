/* App.js */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Collect from "./components/Collect";
import Dashboard from "./components/Dashboard";
import Logs from "./components/Logs";
import More from "./components/More";
import Menu from "./components/Menu";
import Station from "./components/Station";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.StrictMode>
          <Menu />
          <Switch>
            <Route exact path="/" component={Collect} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logs" component={Logs} />
            <Route path="/more" component={More} />
            <Route path="/station" component={Station} />
          </Switch>
        </React.StrictMode>
      </BrowserRouter>
    );
  }
}
