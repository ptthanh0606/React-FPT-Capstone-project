import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import md5 from 'utils/md5';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const UserCard = ({ id, name, email, department, code, isLead }) => {
  return (
    <>
      <div class="card card-custom gutter-b card-stretch">
        <div class="card-body d-flex flex-column text-center">
          <div class="mt-7">
            <div class="symbol symbol-circle symbol-lg-75">
              <div
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
            <a
              href="/"
              class="text-dark font-weight-bold text-hover-primary font-size-h4"
            >
              {name}
            </a>
          </div>

          <span className="text-muted label-block">{email}</span>

          <div className="mt-5">
            <span
              class={`label label-inline label-lg label-light-${
                isLead ? 'danger' : ''
              } btn-sm font-weight-bold`}
            >
              {isLead ? 'Leader' : 'Member'}
            </span>
          </div>

          <div class="mt-9 mb-4 d-flex justify-content-between">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">View info</Tooltip>}
            >
              <a
                href="/"
                class="btn btn-md btn-icon btn-light-primary btn-pill  mx-2"
              >
                <span className={`svg-icon svg-icon-white`}>
                  <SVG
                    src={toAbsoluteUrl(
                      '/media/svg/icons/Communication/Address-card.svg'
                    )}
                  />
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Edit weight</Tooltip>}
            >
              <a
                href="/"
                class="btn btn-md btn-icon btn-light-info btn-pill  mx-2"
              >
                <span className={`svg-icon svg-icon-white`}>
                  <SVG
                    src={toAbsoluteUrl('/media/svg/icons/Design/Edit.svg')}
                  />
                </span>
              </a>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Force leave</Tooltip>}
            >
              <a
                href="/"
                class="btn btn-md btn-icon btn-light-danger btn-pill  mx-2"
              >
                <span className={`svg-icon svg-icon-white`}>
                  <SVG
                    src={toAbsoluteUrl(
                      '/media/svg/icons/Navigation/Sign-out.svg'
                    )}
                  />
                </span>
              </a>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UserCard);
