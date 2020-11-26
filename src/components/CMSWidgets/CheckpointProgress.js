import React from 'react';

const CheckpointProgress = () => {
  return (
    <div className="card card-custom gutter-b">
      <div className="card-header border-0 pt-5">
        <div className="card-title">
          <div className="card-label">
            <div className="font-weight-bolder">Checkpoint status</div>
            <div className="fontSize-sm text-muted mt-2">3 checkpoints</div>
          </div>
        </div>
      </div>

      <div
        className="card-body d-flex flex-column px-0"
        style={{ position: 'relative' }}
      >
        <div className="flex-grow-1 card-spacer-x">
          <div className="d-flex align-items-center justify-content-between mb-10">
            <div className="d-flex align-items-center mr-2">
              <div className="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                <div className="symbol-label">
                  <img
                    src="assets/media/svg/misc/006-plurk.svg"
                    alt=""
                    className="h-50"
                  />
                </div>
              </div>
              <div>
                <a
                  href="/"
                  className="fontSize-h6 text-dark-75 text-hover-primary font-weight-bolder"
                >
                  Checkpoint 1
                </a>
                <div className="fontSize-sm text-muted font-weight-bold mt-1">
                  06 June 2020
                </div>
              </div>
            </div>
            <div className="label label-light label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base">
              Graded
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-10">
            <div className="d-flex align-items-center mr-2">
              <div className="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                <div className="symbol-label">
                  <img
                    src="assets/media/svg/misc/015-telegram.svg"
                    alt=""
                    className="h-50"
                  />
                </div>
              </div>
              <div>
                <a
                  href="/"
                  className="fontSize-h6 text-dark-75 text-hover-primary font-weight-bolder"
                >
                  Checkpoint 2
                </a>
                <div className="fontSize-sm text-muted font-weight-bold mt-1">
                  06 June 2020
                </div>
              </div>
            </div>
            <div className="label label-light label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base">
              Not yet
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-10">
            <div className="d-flex align-items-center mr-2">
              <div className="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                <div className="symbol-label">
                  <img
                    src="assets/media/svg/misc/015-telegram.svg"
                    alt=""
                    className="h-50"
                  />
                </div>
              </div>
              <div>
                <a
                  href="/"
                  className="fontSize-h6 text-dark-75 text-hover-primary font-weight-bolder"
                >
                  Checkpoint 2
                </a>
                <div className="fontSize-sm text-muted font-weight-bold mt-1">
                  06 June 2020
                </div>
              </div>
            </div>
            <div className="label label-light label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base">
              Not yet
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center mr-2">
              <div className="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                <div className="symbol-label">
                  <img
                    src="assets/media/svg/misc/003-puzzle.svg"
                    alt=""
                    className="h-50"
                  />
                </div>
              </div>
              <div>
                <a
                  href="/"
                  className="fontSize-h6 text-dark-75 text-hover-primary font-weight-bolder"
                >
                  Checkpoint 3
                </a>
                <div className="fontSize-sm text-muted font-weight-bold mt-1">
                  06 June 2020
                </div>
              </div>
            </div>
            <div className="label label-light label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base">
              Not yet
            </div>
          </div>
        </div>
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '415px', height: '448px' }}></div>
          </div>
          <div className="contract-trigger"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CheckpointProgress);
