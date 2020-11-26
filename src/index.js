import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import RecoilLogger from 'recoil-logger';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
// import axios from 'axios';

import * as meta from 'store/meta';

import './index.scss';
import App, { Provider as RouterProvider } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

import { Provider as StoreProvider } from 'store';

import ErrorBoundary from 'utils/ErrorBoundary';
import buildComponentTree from 'utils/buildComponentTree';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '_metronic/_assets/plugins/keenthemes-icons/font/ki.css';
import '_metronic/_assets/plugins/flaticon/flaticon.css';
import '_metronic/_assets/plugins/flaticon2/flaticon.css';

import AuthUpdater from 'auth/AuthUpdater';
import { Container as ToastifyContainer } from 'utils/toast';
import { Container as ConfirmContainer } from 'utils/confirm';

import 'react-datepicker/dist/react-datepicker.css';
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
} from '_metronic/layout';

// import mockAxios from 'utils/request/mocks';
// mockAxios(axios);

const Providers = buildComponentTree([
  // [SomeProvider, { initialState: '' }],
  [StoreProvider],
  [HelmetProvider],
  [RouterProvider],
  [MetronicLayoutProvider],
  [MetronicSplashScreenProvider],
  [ErrorBoundary],
]);

const MetaData = function () {
  const title = useRecoilValue(meta.title);
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

function render(Component) {
  return ReactDOM.render(
    <React.StrictMode>
      <Providers>
        <RecoilLogger />
        <AuthUpdater />
        <MetaData />
        <ToastifyContainer />
        <ConfirmContainer />
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
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
