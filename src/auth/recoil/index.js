import { atom } from 'recoil';
import * as selectors from './selectors';
import * as actions from './actions';

import isAuthenticated from 'auth/helpers/isAuthenticated';

const auth = atom({
  key: 'auth',
  default: {
    isAuthenticated: isAuthenticated(),
  },
});

export default auth;

export { selectors, actions };
