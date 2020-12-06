import React from 'react';

import * as transformers from '../../../../modules/semester/team/transformers';
import * as constants from '../../../../modules/semester/team/constants';

import { Row, Col } from 'react-bootstrap';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';

import Member from './Member';
import Application from './Application';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UtilityButtonTile from 'components/CMSWidgets/UtilityButtonTile';
import { toAbsoluteUrl } from '_metronic/_helpers';
import request from 'utils/request';

import * as endpoints from 'endpoints';
import { useHistory, useParams } from 'react-router-dom';
import { handleErrors } from 'utils/common';

const members = [{}, {}, {}, {}];
const applications = [{}, {}, {}, {}];

const Team = () => {
  const [currentTeam, setCurrentTeam] = React.useState({});

  // ------------------------------------------------------------------

  const { id } = useParams();

  // ------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);

  // ------------------------------------------------------------------

  const fetchTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(id).url,
      method: endpoints.READ_TEAM(id).method,
      params: {
        teamId: id,
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        console.log(transformers.down(res.data.data));
        setCurrentTeam(transformers.down(res.data.data));
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, id]);

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

  React.useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // ------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader
            teamName={currentTeam?.name || ''}
            department={currentTeam?.department?.fullLabel}
            teamType={currentTeam?.privacy ? 'Public' : 'Private'}
            teamStatus={currentTeam?.status ? 'Matched' : 'Matching'}
            withTopic={currentTeam?.topic}
          />
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
                    {currentTeam?.members?.length}/{currentTeam?.maxMembers}
                  </span>
                </span>
              </div>
              <Row className="d-flex flex-grow-1 px-8 pb-4">
                {currentTeam?.members?.length ? (
                  <>
                    <Col sm={12} md={6} lg={6} xl={4}>
                      <Member
                        name={currentTeam.leader.label}
                        email={currentTeam.leader.email}
                        isLeader
                      />
                    </Col>
                    {currentTeam?.members
                      .filter(({ value }) => value !== currentTeam.leader.value)
                      .map(member => (
                        <Col sm={12} md={6} lg={6} xl={4}>
                          <Member name={member.name} email={member.email} />
                        </Col>
                      ))}
                  </>
                ) : (
                  <Col sm={12} md={6} lg={6} xl={4}>
                    No member available, this might be a problem
                  </Col>
                )}
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
                    {currentTeam?.applications?.length}
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
                      {currentTeam?.applications?.length ? (
                        currentTeam?.applications.map(i => <Application />)
                      ) : (
                        <tr>
                          <td className="text-muted">
                            This team currently don't have any applications yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xxl-3">
          {!currentTeam?.privacy && (
            <UtilityButtonTile
              className="gutter-b"
              smallTitle="Private code"
              baseColor="info"
              label={currentTeam?.code}
              tooltipMsg={
                <>
                  You can give this code to another student for joining.
                  <br />
                  <br /> Click the refresh button to get new code.
                </>
              }
              buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Update.svg')}
            />
          )}

          {currentTeam?.lock ? (
            <UtilityButtonTile
              className="gutter-b"
              smallTitle="Team state"
              baseColor="danger"
              label="Locked"
              buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Lock.svg')}
            />
          ) : (
            <UtilityButtonTile
              className="gutter-b"
              smallTitle="Team state"
              baseColor="success"
              label="Unlocked"
              buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Unlock.svg')}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Team;
