import React from 'react';
import { /* BrowserRouter, */ Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { isAuthenticated } from '../services/auth';

import history from './history';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Preferences from '../pages/Preferences';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Meetup from '../pages/Meetup';
import NewMeetup from '../pages/NewMeetup';
import About from '../pages/About';
import Navbar from '../components/Navbar';

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
  <ConnectedRouter history={history}>
    <Route exact path="/" component={SignIn} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Navbar />
    <Switch>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute path="/preferences" component={Preferences} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/meetup/:id" component={Meetup} />
      <PrivateRoute path="/newmeetup" component={NewMeetup} />
      <PrivateRoute path="/about" component={About} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
