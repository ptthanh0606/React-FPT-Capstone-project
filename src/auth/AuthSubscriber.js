import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import atom from './recoil';
import isAuthenticated from './helpers/isAuthenticated';

function AuthSubscriber() {
  const [state, setState] = useRecoilState(atom);

  const subscriber = useCallback(
    function (event) {
      if (event.storageArea === localStorage) {
        if (state.isAuthenticated !== isAuthenticated())
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
    return () => window.removeEventListener('storage', subscriber);
  }, [subscriber]);

  return null;
}

export default AuthSubscriber;
