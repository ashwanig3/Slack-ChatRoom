import React, { Component } from 'react';
import Signup from './components/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DirectMessage from './components/DirectMessage';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/signup' exact component={Signup} />
            <Route path='/login' exact component={Login} />
            <Route path='/' exact component={Dashboard} />
            <Route path='/direct/:name' exact component={DirectMessage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
