import 'blocks.css';
import '../index.css';

import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes';

function App() {
  return <Routes />;
}

export default hot(module)(App);
