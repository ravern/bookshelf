import 'babel-polyfill';

import { render } from '@hot-loader/react-dom';
import React from 'react';

import App from './components/App';

render(<App />, document.getElementById('bookshelves-main'));
