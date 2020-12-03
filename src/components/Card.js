import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
  CardFooter,
} from '_metronic/_partials/controls';

import Spinner from 'react-bootstrap/Spinner';

const CMSCard = ({
  isLoading = false,
  title = '',
  subtitle = '',
  icon = '',
  sticky = false,
  toolbar = '',
  children = '',
  footer = '',
  ...props
}) => {
  return (
    <Card {...props}>
      <CardHeader
        title={
          <>
            {title}
            <small>{subtitle}</small>
          </>
        }
        icon={icon}
        sticky={sticky}
      >
        <CardHeaderToolbar>{toolbar}</CardHeaderToolbar>
      </CardHeader>
      <div className={isLoading && 'overlay overlay-block'}>
        <div className="overlay-wrapper">
          <CardBody>{children}</CardBody>
          {footer && <CardFooter>{footer}</CardFooter>}
        </div>
        {isLoading && (
          <div className="overlay-layer bg-dark-o-10">
            <Spinner
              as="span"
              animation="border"
              size="xl"
              role="status"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default React.memo(CMSCard);
