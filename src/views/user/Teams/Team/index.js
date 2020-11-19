import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import Member from './Member';
import Application from './Application';

const members = [{}, {}, {}, {}];
const applications = [{}, {}, {}, {}];

const Team = () => {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Team SKT T1',
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
  return (
    <>
      <Row>
        <div
          style={{
            padding: '.5rem 1rem',
            marginBottom: '1.5rem',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
            }}
          >
            SKT T1
          </h1>
          <span className="font-size-h2">Private team</span>
        </div>
      </Row>
      <Row>
        <Col lg={9}>
          <div className={`card card-custom gutter-b`}>
            <div className="card-body d-flex flex-column p-0">
              <div className="d-flex justify-content-between card-spacer flex-grow-1">
                <div className="d-flex flex-column mr-2">
                  <a
                    href="#"
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
                    href="#"
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
                        <th>Time</th>
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
        </Col>
        <Col lg={3}>
          <div className="card card-custom p-8 bg-info text-white">
            <h2
              style={{
                marginBottom: 0,
                fontSize: '2rem',
                fontWeight: 800,
              }}
            >
              J7HC6D
              <span className="float-right">
                <i
                  className="fas fa-retweet text-white"
                  style={{
                    fontSize: '2.5rem',
                  }}
                ></i>
              </span>
            </h2>
          </div>
          <div className="card card-custom p-8 bg-primary text-white mt-8">
            <Row>
              <Col sm={9}>
                <h2
                  style={{
                    marginBottom: 0,
                    fontSize: '1.5rem',
                    fontWeight: 800,
                  }}
                >
                  SE
                </h2>
                Software Engineering
              </Col>
              <Col sm={3}>
                <span className="float-right">
                  <i
                    className="fas fa-hotel text-white"
                    style={{
                      fontSize: '3rem',
                    }}
                  ></i>
                </span>
              </Col>
            </Row>
          </div>
          <div className="card card-custom p-8 bg-danger text-white mt-8">
            <h2
              style={{
                marginBottom: 0,
                fontSize: '2rem',
                fontWeight: 800,
              }}
            >
              Locked
              <span className="float-right">
                <i
                  className="fas fa-lock text-white"
                  style={{
                    fontSize: '2.5rem',
                  }}
                ></i>
              </span>
            </h2>
          </div>
          <div className="card card-custom p-8 bg-warning text-white mt-8">
            <h2
              style={{
                marginBottom: 0,
                fontSize: '2rem',
                fontWeight: 800,
              }}
            >
              Settings
              <span className="float-right">
                <i
                  className="fas fa-cogs text-white"
                  style={{
                    fontSize: '2.5rem',
                  }}
                ></i>
              </span>
            </h2>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Team;
