/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useState } from 'react';
// import SVG from 'react-inlinesvg';
import { Tab, Nav, Spinner } from 'react-bootstrap';
// import { toAbsoluteUrl } from '../../../../_helpers';
import roleSelector from 'auth/recoil/selectors/role';
import request from 'utils/request';
import { useRecoilValue } from 'recoil';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';

export function QuickPanel() {
  const role = useRecoilValue(roleSelector);
  const [selectedTab, setSelectedTab] = useState('Notifications');
  const [pageNumber, setPageNumber] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const setTab = _tabName => {
    setSelectedTab(_tabName);
  };

  React.useEffect(() => {
    if (['admin', 'lecturer', 'student'].includes(role)) {
      setIsLoading(true);
      request({
        to: endpoints.LIST_NOTIFICATION.url,
        method: endpoints.LIST_NOTIFICATION.method,
        params: {
          pageNumber,
          pageSize: 20,
        },
      })
        .then(res => {
          setNotifications(v => [...v, ...(res?.data?.data || [])]);
          if (res?.data?.totalPages > pageNumber) setHasNext(true);
          else setHasNext(false);
        })
        .catch(handleErrors)
        .finally(() => setIsLoading(false));
    }
  }, [pageNumber, role]);

  const loadNextPage = React.useCallback(() => {
    setPageNumber(v => v + 1);
  }, []);

  return (
    <div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
      <Tab.Container defaultActiveKey={selectedTab}>
        {/*begin::Header*/}
        <div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
          <Nav
            onSelect={setTab}
            as="ul"
            role="tablist"
            className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
          >
            <Nav.Item className="nav-item" as="li">
              <Nav.Link
                eventKey="Notifications"
                className={`nav-link ${
                  selectedTab === 'Notifications' ? 'active' : ''
                }`}
              >
                Notifications
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div
            className="offcanvas-close mt-n1 pr-5"
            style={{ position: 'absolute', top: '15px', right: '10px' }}
          >
            <a
              href="#"
              className="btn btn-xs btn-icon btn-light btn-hover-primary"
              id="kt_quick_panel_close"
            >
              <i className="ki ki-close icon-xs text-muted"></i>
            </a>
          </div>
        </div>
        {/*end::Header*/}

        {/*begin::Content*/}
        <div className="offcanvas-content px-10">
          <div className="tab-content">
            <div
              id="kt_quick_panel_notifications"
              role="tabpanel"
              className={`tab-pane fade pt-2 pr-5 mr-n5 scroll ps ${
                selectedTab === 'Notifications' ? 'active show' : ''
              }`}
              style={{
                paddingBottom: 20,
              }}
            >
              <div className="navi navi-icon-circle navi-spacer-x-0">
                {notifications?.map(i => (
                  <a href="#" className="navi-item">
                    <div className="navi-link rounded">
                      {/* <div className="symbol symbol-50 mr-3">
                      <div className="symbol-label">
                        <i className="flaticon-bell text-success icon-lg"></i>
                      </div>
                    </div> */}
                      <div className="navi-text">
                        <div className="font-weight-bold font-size-lg">
                          {i.title}
                        </div>
                        <div className="text-muted">{i.message}</div>
                      </div>
                    </div>
                  </a>
                ))}
                {isLoading ? (
                  <div className="my-4">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    />
                    Loading...
                  </div>
                ) : (
                  hasNext && (
                    <div className="cursor-pointer my-4" onClick={loadNextPage}>
                      Load more...
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {/*end::Content*/}
      </Tab.Container>
    </div>
  );
}
