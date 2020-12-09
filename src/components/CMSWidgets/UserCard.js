import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';

const UserCard = ({ id, name, email, code, isLead, role }) => {
  // ------------------------------------------------------------

  const handleMakeLeader = React.useCallback(e => {
    e.preventDefault();
    // Route to user id
  }, []);

  const handleForceLeave = React.useCallback(e => {
    e.preventDefault();
    // Route to user id
  }, []);

  // ------------------------------------------------------------

  return (
    <>
      <div class="card card-custom gutter-b card-stretch">
        <div class="card-body d-flex flex-column text-center">
          <div class="">
            <div class="symbol symbol-circle symbol-lg-75">
              <Link
                to={`/profile/${role}/${id}`}
                className="symbol-label"
                style={{
                  backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                    email.toLowerCase()
                  )})`,
                }}
              />
            </div>
          </div>

          <div class="mt-2">
            <Link
              to={`/profile/${role}/${id}`}
              class="text-dark font-weight-bold text-hover-primary font-size-h4"
            >
              {name}
            </Link>
          </div>

          <span className="text-muted label-block">{code}</span>

          <div className="mt-5">
            <span
              class={`label label-inline label-lg label-light-${
                isLead ? 'danger' : ''
              } btn-sm font-weight-bold`}
            >
              {isLead ? 'Leader' : 'Member'}
            </span>
          </div>

          {/* <div class="mt-9 mb-4 d-flex justify-content-center">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Make Leader</Tooltip>}
            >
              <a
                href="/"
                onClick={handleMakeLeader}
                class="btn btn-md btn-icon btn-light-primary btn-pill  mx-2"
              >
                <i class="fab fa-font-awesome-flag"></i>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Force leave</Tooltip>}
            >
              <a
                href="/"
                onClick={handleForceLeave}
                class="btn btn-md btn-icon btn-light-danger btn-pill  mx-2"
              >
                <span className={`svg-icon svg-icon-white`}>
                  <i class="fas fa-user-slash"></i>
                </span>
              </a>
            </OverlayTrigger>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default React.memo(UserCard);
