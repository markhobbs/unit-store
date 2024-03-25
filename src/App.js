import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Logs from './components/Logs';
import Collect from './components/Collect';
import Station from './components/Station';
import Dashboard from './components/Dashboard';
import More from './components/More';
import './App.css';
import Menu from './components/Menu';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.StrictMode>
            <Menu />
            <Switch>
              <Route exact path="/" component={ Collect } />
              <Route path="/dashboard" component={ Dashboard } />
              <Route path="/logs" component={ Logs } />
              <Route path="/more" component={ More } />
              <Route path="/station" component={ Station } />
            </Switch>
          </React.StrictMode>
      </BrowserRouter>
    );
  }
}