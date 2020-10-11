import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button } from 'react-bootstrap';

import isAuthenticatedSelector from 'auth/recoil/selectors/isAuthenticated';

const AuthGuard = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

  if (isAuthenticated) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '10px 20px',
          borderRadius: 4,
          fontSize: 14,
        }}
      >
        Please{' '}
        <Link to="/auth/login">
          <Button variant="primary" style={{ margin: '0px 5px' }}>
            Login
          </Button>
        </Link>{' '}
        to continue...
      </div>
    </div>
  );
};

export default AuthGuard;
