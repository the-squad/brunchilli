import React, { PureComponent } from 'react';
import { injectGlobal } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import IconLoader from './components/IconLoader';
import Splash from './components/Splash';

import Home from './views/Home';
import Search from './views/Search';
import Confirmation from './views/Confirmation';
import Login from './views/Login';
import SignUp from './views/SignUp';
import FoodMenu from './views/FoodMenu';
import CategoriesList from './views/CategoriesList';
import OrdersHistory from './views/OrdersHistory';

import icons from './selection.json';
import User from './models/User';

import Urls from './Urls';

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

class App extends PureComponent {
  constructor(props) {
    super(props);
    IconLoader.getInstance().setIconStore(icons);

    this.user = new User();

    this.state = {
      isGettingUser: this.user.isUserExists(),
    };
  }

  componentDidMount() {
    if (this.user.isUserExists()) {
      axios.get(`${Urls.getUser}/${this.user.getUserId()}`).then(response => {
        this.setState(
          {
            isGettingUser: false,
          },
          () => {
            this.user.setUser(response.data);
            this.header.renderUserTabs(response.data);
          },
        );
      });
    }
  }

  getHeaderRef = () => this.header;

  render() {
    const { isGettingUser } = this.state;
    const redirect = this.user.isUserAdmin() ? '/menu' : '/';

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
          <Route
            path="/login"
            component={() => <Login {...this.props} getHeaderRef={this.getHeaderRef} />}
          />
          <Route
            path="/register"
            component={() => <SignUp {...this.props} getHeaderRef={this.getHeaderRef} />}
          />
          <AuthRoute admin redirect={redirect} path="/menu" component={FoodMenu} />
          <AuthRoute admin redirect={redirect} path="/categories" component={CategoriesList} />
          <AuthRoute admin redirect={redirect} path="/orders" component={OrdersHistory} />
          <AuthRoute redirect={redirect} path="/" exact component={Home} />
          <AuthRoute redirect={redirect} path="/results" component={Search} />
          <AuthRoute redirect={redirect} path="/confirmation" component={Confirmation} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
