import React from 'react';

const Anouncement = ({
  type = 'primary',
  announcements = [{ updatedAt: '', title: '', content: '' }],
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
      <div className="card-body d-flex flex-column align-items-start">
        <span className="card-title font-weight-bolder text-muted text-hover-primary font-size-h5 mb-4">
          Anouncements
        </span>

        {announcements.length ? (
          announcements.map(announce => (
            <div className="mt-9 mb-4">
              <div className={`font-weight-bolder text-${type}`}>
                {announce.updatedAt}
              </div>

              <div className="text-dark-75 font-size-h6 m-0 d-flex flex-column mt-3">
                <span className="font-weight-bolder mb-4">
                  {announce.title}
                </span>
                {announce.content}
              </div>
            </div>
          ))
        ) : (
          <>No anouncement available</>
        )}
      </div>
    </div>
  );
};

export default React.memo(Anouncement);
