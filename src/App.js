import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MessengerMainPage from './pages/MessengerMainPage';

class App extends Component {
  render() {
    return <div className="app">
        <Switch>
        <Route exact path="/" component={MessengerMainPage} />
    </Switch>
    </div>;
  }
}

export default App;
