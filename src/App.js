import React, { Fragment } from 'react';

import GlobalStyle from './styles/global';

import Main from './pages/Main';
import Login from './pages/Login';

const App = () => (
  <Fragment>
    <GlobalStyle />
    {/* <Main /> */}
    <Login />
  </Fragment>
);

export default App;
