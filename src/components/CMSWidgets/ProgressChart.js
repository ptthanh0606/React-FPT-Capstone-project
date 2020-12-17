/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from 'react';
import objectPath from 'object-path';
import ApexCharts from 'apexcharts';
import { KTUtil } from '_metronic/_assets/js/components/util';
import { useHtmlClassService } from '_metronic/layout';

export function ProgressChart({
  className = '',
  title = '',
  subTitle = '',
  description = '',
  action = <></>,
  percent = 0,
  baseColor = '',
}) {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray100: objectPath.get(
        uiService.config,
        'js.colors.gray.gray100'
      ),
      colorsGrayGray700: objectPath.get(
        uiService.config,
        'js.colors.gray.gray700'
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${baseColor}`
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${baseColor}`
      ),
      fontFamily: objectPath.get(uiService.config, 'js.fontFamily'),
    };
  }, [baseColor, uiService.config]);

  useEffect(() => {
    const element = document.getElementById('kt_mixed_widget_14_chart');
    if (!element) {
      return;
    }

    const height = parseInt(KTUtil.css(element, 'height'));
    const options = getChartOptions(layoutProps, height, percent);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps, percent]);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header border-0 mt-7">
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          {title}
          <span className="text-muted mt-3 font-weight-bold font-size-sm mb-5">
            {subTitle}
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <div id="kt_mixed_widget_14_chart" style={{ height: '300px' }}></div>
        </div>
        {description && (
          <div className="pt-5">
            <p className="text-center font-weight-normal font-size-lg pb-7">
              {description}
            </p>
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

function getChartOptions(layoutProps, height, percent = 0) {
  const options = {
    series: [percent],
    chart: {
      height: height,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '65%',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            show: false,
            fontWeight: '700',
          },
          value: {
            color: layoutProps.colorsGrayGray700,
            fontSize: '30px',
            fontWeight: '700',
            offsetY: 12,
            show: true,
          },
        },
        track: {
          background: layoutProps.colorsThemeLightSuccess,
          strokeWidth: '100%',
        },
      },
    },
    colors: [layoutProps.colorsThemeBaseSuccess],
    stroke: {
      lineCap: 'round',
    },
    labels: ['Progress'],
  };
  return options;
}
