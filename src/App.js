import React, { Fragment } from 'react';

import GlobalStyle from './styles/global';

import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Preferences from './pages/Preferences';
import Profile from './pages/Profile';
import Meetup from './pages/Meetup';

const App = () => (
  <Fragment>
    <GlobalStyle />
    {/* <Main /> */}
    {/* <SignIn /> */}
    {/* <SignUp /> */}
    {/* <Preferences /> */}
    {/* <Profile /> */}
    <Meetup />
  </Fragment>
);

export default App;
