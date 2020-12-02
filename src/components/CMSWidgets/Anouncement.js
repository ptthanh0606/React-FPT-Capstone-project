import React from 'react';

const Anouncement = ({
  type = 'primary',
  date = 'Title',
  body = <>body</>,
}) => {
  return (
    <div
      className={`card wave wave-animate-slow wave-${type} card-custom bgi-no-repeat card-border gutter-b`}
      style={{
        backgroundPosition: 'right top',
        backgroundSize: '30% auto',
        backgroundImage: 'url(assets/media/svg/shapes/abstract-4.svg)',
      }}
    >
      <div className="card-body">
        <span className="card-title font-weight-bolder text-muted text-hover-primary font-size-h5">
          Anouncement
        </span>

        <div className={`font-weight-bolder text-${type} mt-9 mb-5`}>
          {date}
        </div>

        <p className="text-dark-75 font-size-h5 m-0">{body}</p>
      </div>
    </div>
  );
};

export default React.memo(Anouncement);
