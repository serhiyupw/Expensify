import {init as StoreInit} from './store/Store.js';
import SignInPage from './page/SignInPage.js';
import HomePage from './page/HomePage/HomePage.js';
import * as Store from './store/Store.js';
import * as ActiveClientManager from './lib/ActiveClientManager.js';
import {verifyAuthToken} from './store/actions/SessionActions.js';
import STOREKEYS from './store/STOREKEYS.js';
import {NativeRouter, Route, Redirect, Switch} from 'react-router-native';
import React, {Component} from 'react';

// Initialize the store when the app loads for the first time
StoreInit();

export default class Expensify extends Component {
  constructor(props) {
    super(props);

    this.sessionChanged = this.sessionChanged.bind(this);

    this.state = {
      redirectTo: null,
    };
  }

  async componentDidMount() {
    // Listen for when the app wants to redirect to a specific URL
    Store.subscribe(STOREKEYS.APP_REDIRECT_TO, (redirectTo) => {
      this.setState({redirectTo});
    });

    // Verify that our authToken is OK to use
    verifyAuthToken();

    // Initialize this client as being an active client
    await ActiveClientManager.init();
    //TODO: Refactor window events
    // window.addEventListener('beforeunload', () => {
    //   ActiveClientManager.removeClient();
    // });
  }

  /**
   * When the session changes, change which page the user sees
   *
   * @param {object} newSession
   */
  sessionChanged(newSession) {
    this.setState({isAuthTokenValid: newSession && newSession.authToken});
  }

  render() {
    return (
      <NativeRouter>
        {/* If there is ever a property for redirecting, we do the redirect here */}
        {this.state.redirectTo && <Redirect to={this.state.redirectTo} />}

        <Switch>
          <Route path="/signin" component={SignInPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </NativeRouter>
    );
  }
}
