import React from 'react';
import { Link } from 'react-router-dom';

const SemesterCard = props => {
  return (
    <div
      className={'col bg-' + props.color + ' px-6 py-8 rounded-xl mr-7 mb-7'}
    >
      <i class="fas fa-archway text-light d-block my-2 font-size-h1"></i>
      <Link to={'/semester/' + props.id}>
        <span className="text-white font-size-h2" style={{ fontWeight: 700 }}>
          {props.title}
        </span>
      </Link>
      <br />
      <span className="text-light font-weight-bold font-size-h6">
        {props.status}
      </span>
    </div>
  );
};

export default SemesterCard;
