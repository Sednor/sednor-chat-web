import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHandlePage from '../pages/MainHandlePage';
import Loading from '../layout/Loading';
import UserLoginPage from '../pages/UserLoginPage';

class Router extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={MainHandlePage} />
          <Route path="/loading" component={Loading} />
          <Route path="/login" component={UserLoginPage} />
        </Switch>
    );
  }
}

export default Router;
