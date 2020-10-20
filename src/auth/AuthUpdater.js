import { memo } from 'react';

import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import atom from './recoil';
import isAuthenticated from './helpers/isAuthenticated';

const AuthSubscriber = memo(() => {
  const [state, setState] = useRecoilState(atom);

  const subscriber = useCallback(
    function (event) {
      if (
        event.storageArea === localStorage &&
        state.isAuthenticated !== isAuthenticated()
      ) {
        console.log(
          'auth status updated from',
          state.isAuthenticated,
          'to',
          isAuthenticated()
        );
        setState(state => ({
          ...state,
          isAuthenticated: isAuthenticated(),
        }));
      }
    },
    [setState, state.isAuthenticated]
  );

  useEffect(() => {
    window.addEventListener('storage', subscriber);
    window.addEventListener('localStorage', subscriber);

    return () => {
      window.removeEventListener('storage', subscriber);
      window.addEventListener('localStorage', subscriber);
    };
  }, [subscriber]);

  return null;
});

export default AuthSubscriber;
