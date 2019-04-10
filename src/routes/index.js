import React, { Fragment } from 'react';

import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

// import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Preferences from '../pages/Preferences';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Meetup from '../pages/Meetup';
import NewMeetup from '../pages/NewMeetup';
import Search from '../pages/Search';

import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/preferences" component={Preferences} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/meetup/:id" component={Meetup} />
        <PrivateRoute path="/newmeetup" component={NewMeetup} />
        <PrivateRoute path="/search" component={Search} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
