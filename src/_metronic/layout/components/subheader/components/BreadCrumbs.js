/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export const BreadCrumbs = React.memo(function ({ items }) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2">
      <li className="breadcrumb-item">
        <Link to="/">
          <i className="flaticon2-shelter text-muted icon-1x" />
        </Link>
      </li>
      {items.map(item => (
        <li key={`bc${item.path}`} className="breadcrumb-item">
          <Link className="text-muted" to={{ pathname: item.path }}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
});
