import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import UserTokenHandlePage from './pages/UserTokenHandlePage';
import Header from './layout/Header';

class App extends Component {
  render() {
    return <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={UserTokenHandlePage} />
      </Switch>
    </div>;
  }
}

export default App;
