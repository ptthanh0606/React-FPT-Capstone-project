import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import roleSelector from 'auth/recoil/selectors/role';
import semesterAtom from 'store/semester';

export function SemesterToggler() {
  const role = useRecoilValue(roleSelector);
  const semester = useRecoilValue(semesterAtom);

  if (role !== 'admin')
    return (
      <>
        {semester?.name && (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Change semester</Tooltip>}
          >
            <div className="topbar-item">
              <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2">
                <Link to="/select-semester">
                  <span
                    className="symbol rounded bg-primary text-white"
                    style={{
                      height: 35,
                      lineHeight: '35px',
                      padding: '0 1rem',
                      fontWeight: 600,
                    }}
                  >
                    {semester.name}
                  </span>
                </Link>
              </div>
            </div>
          </OverlayTrigger>
        )}
      </>
    );

  return null;
}
