import CMSModal from 'components/CMSModal/CMSModal';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useConfirm from 'utils/confirm';
import md5 from 'utils/md5';

const UserCard = ({
  id = '',
  name = '',
  email = '',
  code = '',
  isLead = false,
  role = '',
  weight = 10,
  isUserLeadCouncil = false,
}) => {
  const [showEditWeight, setShowEditWeight] = React.useState(false);
  const confirm = useConfirm();

  // ------------------------------------------------------------------

  const handleMakeLeader = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Transfer leadership to selected members?',
    });
  }, [confirm]);

  const handleEditWeight = React.useCallback(() => {
    setShowEditWeight(true);
  }, []);

  // ------------------------------------------------------------------

  return (
    <>
      <div className="card card-custom gutter-b card-stretch ribbon ribbon-top">
        {isLead && (
          <div
            className="ribbon-target bg-danger"
            style={{ top: '-2px', right: '20px' }}
          >
            Leader
          </div>
        )}

        <div className="card-body d-flex flex-column text-center">
          <div className="">
            <div className="symbol symbol-circle symbol-lg-75">
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

          <div className="mt-2">
            <Link
              to={`/profile/${role}/${id}`}
              className="text-dark font-weight-bold text-hover-primary font-size-h4"
            >
              {name}
            </Link>
          </div>

          <span className="text-muted label-block">{code}</span>

          <div className="mt-5">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Weight</Tooltip>}
            >
              <span className="label label-inline font-weight-bolder">
                {weight}
              </span>
            </OverlayTrigger>
          </div>

          {isUserLeadCouncil && !isLead && (
            <div className="mt-9 mb-4 d-flex justify-content-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="quick-user-tooltip">Make Leader</Tooltip>}
              >
                <button
                  onClick={handleMakeLeader}
                  className="btn btn-md btn-icon btn-light-primary btn-pill  mx-2"
                >
                  <i className="fab fa-font-awesome-flag"></i>
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="quick-user-tooltip">Edit weight</Tooltip>}
              >
                <button
                  onClick={handleEditWeight}
                  className="btn btn-md btn-icon btn-light-info btn-pill  mx-2"
                >
                  <span className={`svg-icon svg-icon-white`}>
                    <i className="fas fa-pen"></i>
                  </span>
                </button>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>

      <CMSModal
        isShowFlg={showEditWeight}
        configs={[
          {
            name: 'weight',
            type: 'text',
            label: 'Weight',
          },
        ]}
        fieldTemplate={{
          weight: '0',
        }}
        title="Update weight"
        subTitle="Change weight of this council member"
        primaryButtonLabel="Update"
        onHide={() => setShowEditWeight(false)}
      />
    </>
  );
};

export default React.memo(UserCard);
