import React from 'react';
import { Dropdown } from 'react-bootstrap';
import md5 from 'utils/md5';
import userAtom from 'store/user';
import { useRecoilValue } from 'recoil';
import { role } from 'auth/recoil/selectors';
import { Link, useHistory } from 'react-router-dom';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import useConfirm from 'utils/confirm';
import semesterAtom from 'store/semester';
import toast from 'utils/toast';

const DropdownCustomToggler = React.forwardRef((props, ref) => {
  return (
    <a
      href="/"
      ref={ref}
      className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </a>
  );
});

const Member = ({
  teamId = '',
  id = '',
  email = '',
  name = '',
  isLeader = false,
  leaderId = '',
  role = '',
  onOperationSuccess = () => {},
}) => {
  const currentSemester = useRecoilValue(semesterAtom);
  // -----------------------------------------------------------------------------

  const history = useHistory();
  const showConfirm = useConfirm();

  // -----------------------------------------------------------------------------

  const currentUser = useRecoilValue(userAtom);
  const userRole = useRecoilValue(role);

  // -----------------------------------------------------------------------------

  const forceLeaveMember = React.useCallback(() => {
    request({
      to: endpoints.LEAVE_TEAM(teamId).url,
      method: endpoints.LEAVE_TEAM(teamId).method,
      params: {
        forcedOut: id,
        teamId: teamId,
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        toast.success('Team members updated!');
        onOperationSuccess();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, id, onOperationSuccess, teamId]);

  // -----------------------------------------------------------------------------

  const handleMakeLeader = React.useCallback(
    e => {
      e.preventDefault();
      request({
        to: endpoints.TRANSFER_LEADER_TEAM(id).url,
        method: endpoints.TRANSFER_LEADER_TEAM(id).method,
        data: {
          newTeamLeaderId: id,
          teamId: teamId,
          semesterId: currentSemester.id,
        },
      })
        .then(() => {
          toast.success('Team leadership updated!');
          onOperationSuccess();
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id, id, onOperationSuccess, teamId]
  );

  const handleForceLeave = React.useCallback(
    e => {
      e.preventDefault();
      showConfirm({
        title: 'Confirm required',
        body: 'Are you sure you want to kick this member?',
        onConfirm: forceLeaveMember,
      });
    },
    [forceLeaveMember, showConfirm]
  );

  // -----------------------------------------------------------------------------

  return (
    <>
      <div class="d-flex justify-content-between mb-4">
        <div class="d-flex align-items-start justify-content-start">
          <div class="flex-shrink-0 mr-4 mt-lg-0 mt-3">
            <Link to={`/profile/${role}/${id}`} class="symbol symbol-70 ml-3">
              <span
                class="symbol-label"
                style={{
                  backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                    email.toLowerCase()
                  )})`,
                }}
              ></span>
            </Link>
          </div>
          <div class="d-flex flex-column align-items-start">
            <Link
              to={`/profile/${role}/${id}`}
              class="text-dark font-weight-bold text-hover-primary font-size-h5 mb-0"
            >
              {name}
            </Link>
            <span class="text-muted font-weight-bold">{email}</span>
            <div className="mt-2">
              {isLeader && (
                <span class="label label-inline label-danger font-weight-bold ">
                  Leader
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Check user phai student khong => Check xem day co phai la member component khong => check xem user dang login phai team lead khong => Leader co the make leader, kick member */}
        {userRole === 'student' && !isLeader && currentUser.id === leaderId && (
          <div className="px-2">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                variant="transparent"
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <ul className="navi navi-hover">
                  <li className="navi-item">
                    <a
                      href="/"
                      onClick={handleMakeLeader}
                      className="navi-link"
                    >
                      <span className="navi-icon">
                        <i className="fab fa-font-awesome-flag"></i>
                      </span>
                      <span className="navi-text">Make leader</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a
                      href="/"
                      onClick={handleForceLeave}
                      className="navi-link"
                    >
                      <span className="navi-icon">
                        <i className="far fa-times-circle"></i>
                      </span>
                      <span className="navi-text">Force leave</span>
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
};

export default Member;
