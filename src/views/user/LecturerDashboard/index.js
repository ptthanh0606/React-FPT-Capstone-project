import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import Anouncement from 'components/CMSWidgets/Anouncement';
import QuickAction from 'components/CMSWidgets/QuickAction';
import { toAbsoluteUrl } from '_metronic/_helpers';
import CMSList from 'components/CMSList';
import { applicationRowActionFormatter, rowActionFormatter } from './constants';
import StatTile from 'components/CMSWidgets/StatTile';
import { useHistory } from 'react-router-dom';

export default React.memo(function LecturerDashboard() {
  const history = useHistory();
  const setMeta = useSetRecoilState(metaAtom);

  // --------------------------------------------------------------------

  const handleRouteToTopics = React.useCallback(
    e => {
      if (e) e.preventDefault();
      history.push('/topic');
    },
    [history]
  );

  const handleRouteToSpecificTopic = React.useCallback(
    id => {
      return function () {
        history.push('/' + id);
      };
    },
    [history]
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return (
    <div className="row">
      <div className="col-lg-6 col-xxl-4">
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
            <QuickAction
              className="gutter-b"
              title="Quick topic actions"
              actionsRows={[
                [
                  {
                    className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                    type: 'danger',
                    iconSrc: toAbsoluteUrl(
                      '/media/svg/icons/Design/Join-1.svg'
                    ),
                    label: 'Apply for mentor',
                    onClick: handleRouteToTopics,
                  },
                  {
                    className: 'col px-6 py-8 rounded-xl mb-7',
                    type: 'success',
                    iconSrc: toAbsoluteUrl('/media/svg/icons/Files/Export.svg'),
                    label: 'Submit topic',
                    onClick: handleRouteToTopics,
                  },
                ],
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xxl-6">
            <StatTile
              className="gutter-b"
              baseColor="primary"
              iconColor="white"
              dataText="790"
              desciption="Topics in this semester"
              iconSrc={toAbsoluteUrl(
                '/media/svg/icons/Communication/Clipboard-list.svg'
              )}
              onClick={handleRouteToTopics}
            />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <StatTile
              className="gutter-b"
              baseColor="white"
              iconColor="primary"
              dataText="40"
              desciption="Topic you are mentoring"
              iconSrc={toAbsoluteUrl('/media/svg/icons/General/Half-star.svg')}
              onClick={handleRouteToTopics}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xxl-4">
        <CMSList
          className="gutter-b"
          title="My submited topic status"
          toolBar={
            <a
              href="/"
              onClick={handleRouteToTopics}
              className="text-primary font-weight-bolder"
            >
              View all
            </a>
          }
          rows={[
            {
              label: 'Capstone Management System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE13',
              action: rowActionFormatter(1),
            },
            {
              label: 'Web Checker System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: rowActionFormatter(0),
            },
            {
              label: 'Example topic name',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
            },
            {
              label: 'Example topic name 2',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(1),
            },
            {
              label: 'Example topic name 3',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(0),
            },
            {
              label: 'Example topic name 4',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: rowActionFormatter(0),
            },
            {
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
            },
          ]}
        />
      </div>
      <div className="col-lg-6 col-xxl-4">
        <Anouncement
          className="gutter-b"
          date="20 Jun 2020"
          body={
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              <br /> Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. <br />
            </>
          }
        />
        <CMSList
          className="gutter-b"
          title="Topic applications"
          rows={[
            {
              label: 'Capstone Management System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE13',
              action: applicationRowActionFormatter(10),
            },
            {
              label: 'Web Checker System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: applicationRowActionFormatter(5),
            },
            {
              label: 'Example topic name',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: applicationRowActionFormatter(2),
            },
          ]}
        />
      </div>
    </div>
  );
});
