import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/Header';
import IconLoader from './components/IconLoader';
import Splash from './components/Splash';

import Home from './views/Home';
import Search from './views/Search';
import Login from './views/Login';
import SignUp from './views/SignUp';

import icons from './selection.json';
import User from './models/User';

/**
 * Injecting global font family to all HTML nodes
 */
injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    IconLoader.getInstance().setIconStore(icons);

    const user = new User();

    this.state = {
      isGettingUser: false, // TODO: replace with user.isUserExits()
    };
  }

  componentDidMount() {
    // TODO: get user data if the user exists
  }

  getHeaderRef = () => this.header;

  render() {
    const { isGettingUser } = this.state;

    if (isGettingUser) {
      return <Splash />;
    }

    return (
      <div className="App">
        <Header
          ref={header => {
            this.header = header;
          }}
          {...this.props}
        />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" component={Search} />
          <Route
            path="/login"
            component={() => <Login {...this.props} getHeaderRef={this.getHeaderRef} />}
          />
          <Route
            path="/register"
            component={() => <SignUp {...this.props} getHeaderRef={this.getHeaderRef} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
