import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';
import MessageTile from './MessageTile';

const TopicTeamPreview = ({
  isStudentHaveTeam = false,
  isStudentHaveTopic = false,
}) => {
  return (
    <div className="card card-custom card-border gutter-b">
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          Your topic
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Your current matched topic
          </span>
        </h3>
      </div>
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center py-1">
          {isStudentHaveTopic && (
            <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
              <a
                href="/"
                className="text-dark font-weight-bolder text-hover-primary font-size-h5"
              >
                Capstone Management System
              </a>
              <span className="text-muted font-weight-bold font-size-lg">
                FA20SE13
              </span>
            </div>
          )}

          {isStudentHaveTeam && !isStudentHaveTopic && (
            <MessageTile
              className="flex-grow-1"
              content={
                <>
                  Now you can start apply for a capstone topic{' '}
                  <Link className="font-weight-bolder text-success" to="/topic">
                    Show me how
                  </Link>
                </>
              }
            />
          )}

          {!isStudentHaveTeam && (
            <MessageTile
              className="flex-grow-1"
              content="Create a team or join a team to start matching for topic"
            />
          )}

          {isStudentHaveTeam && (
            <div className="d-flex flex-column mt-10">
              <span className="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                Team members
              </span>

              <div className="d-flex">
                <div className="symbol symbol-50 mr-5">
                  <div
                    className="symbol-label"
                    style={{
                      backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                        'phanthongthanh0606@gmail.com'
                      )})`,
                    }}
                  />
                </div>
                <div className="symbol symbol-50 mr-5">
                  <div
                    className="symbol-label"
                    style={{
                      backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                        ''
                      )})`,
                    }}
                  />
                </div>
                <div className="symbol symbol-50 mr-5">
                  <div
                    className="symbol-label"
                    style={{
                      backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                        ''
                      )})`,
                    }}
                  />
                </div>
                <div className="symbol symbol-50 mr-5">
                  <div
                    className="symbol-label"
                    style={{
                      backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                        ''
                      )})`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopicTeamPreview);
