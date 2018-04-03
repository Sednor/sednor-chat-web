import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHandlePage from './pages/MainHandlePage/MainHandlePage';

class App extends Component {
  render() {
    return <div className="app">
      <Switch>
        <Route exact path="/" component={MainHandlePage} />
      </Switch>
    </div>;
  }
}

export default App;
