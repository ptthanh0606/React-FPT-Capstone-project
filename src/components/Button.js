import React from 'react';
import { Button as ReactButton } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Button = ({ isLoading, disabled, ...props }) => {
  return (
    <ReactButton {...props} disabled={isLoading || disabled}>
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        props.children
      )}
    </ReactButton>
  );
};

export default React.memo(Button);
