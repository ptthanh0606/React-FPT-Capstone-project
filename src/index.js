import React from 'react';
import ReactDOM from 'react-dom';

import { HelmetProvider } from 'react-helmet-async';
import RecoilLogger from 'recoil-logger';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider as RouterProvider } from 'router';
import { Provider as StoreProvider } from 'store';

import ErrorBoundary from 'utils/ErrorBoundary';
import buildComponentTree from 'utils/buildComponentTree';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './_metronic/_assets/plugins/keenthemes-icons/font/ki.css';
import './_metronic/_assets/plugins/flaticon/flaticon.css';
import './_metronic/_assets/plugins/flaticon2/flaticon.css';

import 'react-datepicker/dist/react-datepicker.css';
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider,
} from './_metronic/layout';

const Providers = buildComponentTree([
  // [SomeProvider, { initialState: '' }],
  [StoreProvider],
  [HelmetProvider],
  [RouterProvider],
  [MetronicLayoutProvider],
  [MetronicSplashScreenProvider],
  [MetronicSubheaderProvider],
  [ErrorBoundary],
]);

function render(Component) {
  return ReactDOM.render(
    <React.StrictMode>
      <Providers>
        <RecoilLogger />
        <Component />
      </Providers>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render(App);

// Enable hot-module-replacement https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
