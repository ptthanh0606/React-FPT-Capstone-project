import { atom } from 'recoil';
import * as selectors from './selectors';
import * as actions from './actions';

import isAuthenticated from 'auth/helpers/isAuthenticated';

const auth = atom({
  key: 'auth',
  default: {
    isAuthenticated: isAuthenticated(),
    role: '', // admin, student, lecturer
  },
});

export default auth;

export { selectors, actions };
