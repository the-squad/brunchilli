import React, { Component, Fragment } from 'react';
import { injectGlobal } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';

import { FontWieghts } from './base/Fonts';
import Colors from './base/Colors';

import Button from './components/Button';
import Header from './components/Header';
import IconLoader from './components/IconLoader';

import Home from './views/Home';
import Search from './views/Search';

import icons from './selection.json';

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
  }

  render() {
    const loginButton = (
      <Fragment>
        <Button primary={false} color={Colors.black} fontWeight={FontWieghts.light}>
          Login
        </Button>

        <Button primary={false} color={Colors.black} fontWeight={FontWieghts.light}>
          Sign up
        </Button>
      </Fragment>
    );

    return (
      <div className="App">
        <Header items={loginButton} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" component={Search} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
