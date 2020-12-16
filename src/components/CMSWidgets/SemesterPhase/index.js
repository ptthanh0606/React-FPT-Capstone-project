import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const SemesterPhase = ({
  className = '',
  phaseStatus = 0,
  semesterName = 'this semester',
  ...props
}) => {
  return (
    <div className={`card card-custom ${className}`} {...props}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          Semester phase
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Status of {semesterName}
          </span>
        </h3>
      </div>
      <div className="card-body pt-2">
        <ul
          className="dashboard-tabs nav nav-pills nav-danger row row-paddingless m-0 p-0"
          role="tablist"
        >
          <li className="nav-item d-flex col flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
            <span
              className={`border py-10 d-flex flex-grow-1 ${
                phaseStatus === 0
                  ? 'bg-light-warning'
                  : ([1, 2, 3].includes(phaseStatus) && 'bg-light-success') ||
                    'bg-light'
              } rounded flex-column align-items-center`}
              data-toggle="pill"
            >
              <span className="nav-icon py-2 w-auto">
                <span
                  className={`svg-icon svg-icon${
                    phaseStatus === 0
                      ? '-warning'
                      : ([1, 2, 3].includes(phaseStatus) && '-success') || ''
                  } svg-icon-3x`}
                >
                  <SVG
                    src={toAbsoluteUrl(
                      `/media/svg/icons${
                        phaseStatus === 0
                          ? '/Cooking/Dish.svg'
                          : ([1, 2, 3].includes(phaseStatus) &&
                              '/Code/Done-circle.svg') ||
                            '/Code/Minus.svg'
                      }`
                    )}
                  />
                </span>
              </span>
              <span className="nav-text font-size-lg py-2 font-weight-bolder text-center">
                Preparing
              </span>
            </span>
          </li>
          <li className="nav-item d-flex col flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
            <span
              className={`border py-10 d-flex flex-grow-1 ${
                phaseStatus === 1
                  ? 'bg-light-warning'
                  : ([2, 3].includes(phaseStatus) && 'bg-light-success') ||
                    'bg-light'
              } rounded flex-column align-items-center`}
              data-toggle="pill"
            >
              <span className="nav-icon py-2 w-auto">
                <span
                  className={`svg-icon svg-icon${
                    phaseStatus === 1
                      ? '-warning'
                      : ([2, 3].includes(phaseStatus) && '-success') || ''
                  } svg-icon-3x`}
                >
                  <SVG
                    src={toAbsoluteUrl(
                      `/media/svg/icons${
                        phaseStatus === 1
                          ? '/Cooking/Dish.svg'
                          : ([2, 3].includes(phaseStatus) &&
                              '/Code/Done-circle.svg') ||
                            '/Code/Minus.svg'
                      }`
                    )}
                  />
                </span>
              </span>
              <span className="nav-text font-size-lg py-2 font-weight-bolder text-center">
                Assigning
              </span>
            </span>
          </li>
          <li className="nav-item d-flex col flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
            <span
              className={`border py-10 d-flex flex-grow-1 ${
                phaseStatus === 2
                  ? 'bg-light-warning'
                  : ([3].includes(phaseStatus) && 'bg-light-success') ||
                    'bg-light'
              } rounded flex-column align-items-center`}
              data-toggle="pill"
            >
              <span className="nav-icon py-2 w-auto">
                <span
                  className={`svg-icon svg-icon${
                    phaseStatus === 2
                      ? '-warning'
                      : ([3].includes(phaseStatus) && '-success') || ''
                  } svg-icon-3x`}
                >
                  <SVG
                    src={toAbsoluteUrl(
                      `/media/svg/icons${
                        phaseStatus === 2
                          ? '/Cooking/Dish.svg'
                          : ([3].includes(phaseStatus) &&
                              '/Code/Done-circle.svg') ||
                            '/Code/Minus.svg'
                      }`
                    )}
                  />
                </span>
              </span>
              <span className="nav-text font-size-lg py-2 font-weight-bolder text-center">
                In-progress
              </span>
            </span>
          </li>
          <li className="nav-item d-flex col flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
            <span
              className={`border py-10 d-flex flex-grow-1 ${
                (phaseStatus === 3 && 'bg-light-success') || 'bg-light'
              } rounded flex-column align-items-center`}
              data-toggle="pill"
            >
              <span className="nav-icon py-2 w-auto">
                <span
                  className={`svg-icon ${
                    phaseStatus === 3 && 'svg-icon-success'
                  } svg-icon-3x`}
                >
                  <SVG
                    src={toAbsoluteUrl(
                      `/media/svg/icons${
                        (phaseStatus === 3 && '/Code/Done-circle.svg') ||
                        '/Code/Minus.svg'
                      }`
                    )}
                  />
                </span>
              </span>
              <span className="nav-text font-size-lg py-2 font-weight-bolder text-center">
                Finished
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(SemesterPhase);
