import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers/AssetsHelpers';
import SVG from 'react-inlinesvg';
import * as constants from '../../../../modules/semester/team/application/constants';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';
import { formatRelative, subMinutes } from 'date-fns';

const Application = ({
  createdAt = '',
  updatedAt = '',
  status = 0,
  id = '',
  topicId = '',
  topicName = '',
  abstract = '',
  leaderId = '',
  onOperationSuccess = () => {},
}) => {
  const history = useHistory();

  // -----------------------------------------------------------------------------

  const currentUser = useRecoilValue(userAtom);
  const userRole = useRecoilValue(role);

  // -----------------------------------------------------------------------------

  const statusTitles = React.useMemo(() => constants.statusTitles, []);
  const statusClass = React.useMemo(() => constants.statusClass, []);

  // -----------------------------------------------------------------------------

  const handleCancelApplication = React.useCallback(() => {
    onOperationSuccess();
  }, [onOperationSuccess]);

  // -----------------------------------------------------------------------------

  return (
    <tr>
      <td className="pl-4">
        <Link
          to={`/topic/${topicId}`}
          className="text-dark-75 text-nowrap font-weight-bolder text-hover-primary mb-1 font-size-lg"
        >
          {topicName}
        </Link>
        <div>
          <span className="text-muted font-weight-bold">{abstract}</span>
        </div>
      </td>
      <td className="text-left pl-0">
        <span className="text-muted font-weight-500">
          {formatRelative(
            subMinutes(new Date(createdAt), new Date().getTimezoneOffset()),
            new Date()
          )}
        </span>
      </td>
      <td className="text-left pl-0">
        <span className="text-muted font-weight-500">
          {formatRelative(
            subMinutes(new Date(updatedAt), new Date().getTimezoneOffset()),
            new Date()
          )}
        </span>
      </td>
      <td className="text-left pl-0">
        <span
          className={`label label-lg label-light-${statusClass[status]} label-inline`}
        >
          {statusTitles[status]}
        </span>
      </td>
      {/* Check xem user login co phai la student khong => check xem badge co phai la pending khong => check xem student dang login co phai leader khong => leader co the cancel application */}
      {userRole === 'student' &&
        statusTitles[status] === 'Pending' &&
        currentUser.id === leaderId && (
          <td className="text-left p-0">
            <button
              onClick={handleCancelApplication}
              className="btn btn-icon btn-light-danger btn-sm"
            >
              <span className="svg-icon svg-icon-md">
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Code/Error-circle.svg')}
                ></SVG>
              </span>
            </button>
          </td>
        )}
    </tr>
  );
};

export default React.memo(Application);
