/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRecoilValue } from 'recoil';
import objectPath from 'object-path';
import { QuickActions } from './components/QuickActions';
import { BreadCrumbs } from './components/BreadCrumbs';
import { useHtmlClassService } from '../../_core/MetronicLayout';
import metaAtom from 'store/meta';

export function SubHeader() {
  const uiService = useHtmlClassService();
  const { title, breadcrumb } = useRecoilValue(metaAtom);

  const layoutProps = React.useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        'subheader.mobile-toggle'
      ),
      subheaderCssClasses: uiService.getClasses('subheader', true),
      subheaderContainerCssClasses: uiService.getClasses(
        'subheader_container',
        true
      ),
    };
  }, [uiService]);

  return (
    <div
      id="kt_subheader"
      className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}

          <div className="d-flex align-items-baseline mr-5">
            <h5 className="text-dark font-weight-bold my-2 mr-5">
              <>{title}</>
            </h5>
          </div>

          <BreadCrumbs items={breadcrumb} />
        </div>

        {/* Toolbar */}
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="btn btn-light btn-sm font-weight-bold"
            id="kt_dashboard_daterangepicker"
            data-toggle="tooltip"
            title="Select dashboard daterange"
            data-placement="left"
          >
            <span
              className="text-muted font-weight-bold mr-2"
              id="kt_dashboard_daterangepicker_title"
            >
              Today
            </span>
            <span
              className="text-primary font-weight-bold"
              id="kt_dashboard_daterangepicker_date"
            >
              Aug 16
            </span>
          </a>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
