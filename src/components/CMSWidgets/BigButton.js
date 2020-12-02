import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const BigButton = () => {
  return (
    <div class="card card-custom wave wave-animate-slow wave-danger mb-8 mb-lg-0">
      <div class="card-body">
        <div class="d-flex align-items-center p-5">
          <div class="mr-6">
            <span class="svg-icon svg-icon-danger svg-icon-4x">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Navigation/Check.svg')}
              ></SVG>
            </span>{' '}
          </div>

          <div class="d-flex flex-column">
            <a href="/" class="text-dark font-weight-bolder font-size-h4 mb-3">
              Apply
            </a>
            <div class="text-dark-75">Books &amp; Articles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigButton;
