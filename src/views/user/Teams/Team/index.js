import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import Member from './Member';
import Application from './Application';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UtilityButtonTile from 'components/CMSWidgets/UtilityButtonTile';
import { toAbsoluteUrl } from '_metronic/_helpers';

const members = [{}, {}, {}, {}];
const applications = [{}, {}, {}, {}];

const Team = () => {
  const setMeta = useSetRecoilState(metaAtom);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Team detail',
      breadcrumb: [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Team', path: '/team' },
        { title: 'SKT T1', path: '/team/1' },
      ],
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={() => {}}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Join
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger font-weight-bold btn-sm"
            onClick={() => {}}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Leave
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={() => {}}
          >
            <i className="fas fa-cog mr-2"></i>
            Settings
          </button>
        </>
      ),
    });
  }, [setMeta]);

  // ------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader teamType="Private" withTopic />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <div className={`card card-custom gutter-b`}>
            <div className="card-body d-flex flex-column p-0">
              <div className="d-flex justify-content-between card-spacer flex-grow-1">
                <div className="d-flex flex-column mr-2">
                  <a
                    href="/"
                    className="text-dark-75 text-hover-primary font-weight-bolder font-size-h5"
                  >
                    Members
                  </a>
                  <span className="text-muted font-weight-bold mt-2">
                    Student in this team
                  </span>
                </div>
                <span className="symbol symbol-light-success symbol-45">
                  <span className="symbol-label font-weight-bolder font-size-h6">
                    4/5
                  </span>
                </span>
              </div>
              <Row className="d-flex flex-grow-1 px-8 pb-4">
                {members.map(i => (
                  <Col sm={12} md={6} lg={6} xl={4}>
                    <Member />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
          <div className={`card card-custom gutter-b`}>
            <div className="card-body d-flex flex-column p-0">
              <div className="d-flex justify-content-between card-spacer flex-grow-1">
                <div className="d-flex flex-column mr-2">
                  <a
                    href="/"
                    className="text-dark-75 text-hover-primary font-weight-bolder font-size-h5"
                  >
                    Applications
                  </a>
                  <span className="text-muted font-weight-bold mt-2">
                    Topic that this team applied
                  </span>
                </div>
                <span className="symbol symbol-light-success symbol-45">
                  <span className="symbol-label font-weight-bolder font-size-h6">
                    4/5
                  </span>
                </span>
              </div>
              <div className="d-flex justify-content-between flex-grow-1 px-8">
                <div className="table-responsive">
                  <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                    <thead>
                      <tr className="text-left text-uppercase">
                        <th className="pl-4">
                          <span className="text-dark-75">Topic</span>
                        </th>
                        <th>Sent at</th>
                        <th>Updated at</th>
                        <th>Status</th>
                        <th width="1%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map(i => (
                        <Application />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xxl-3">
          <UtilityButtonTile
            className="gutter-b"
            smallTitle="Private code"
            baseColor="info"
            label="JUJAKSS"
            tooltipMsg={
              <>
                You can give this code to another student for joining.
                <br />
                <br /> Click the refresh button to get new code.
              </>
            }
            buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Update.svg')}
          />
          <UtilityButtonTile
            className="gutter-b"
            smallTitle="Team state"
            baseColor="danger"
            label="Locked"
            buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Lock.svg')}
          />
        </div>
      </div>
    </>
  );
};
export default Team;
