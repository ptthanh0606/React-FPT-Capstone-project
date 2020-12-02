import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

const MessageTile = ({
  className,
  iconSrc = toAbsoluteUrl('/media/svg/icons/Layout/Layout-4-blocks.svg'),
  content = (
    <>
      Configure user passwords to expire periodically. Users will need warning
      that their passwords are going to expire,
    </>
  ),
}) => {
  return (
    <div
      class="alert alert-custom alert-light-danger fade show mb-10"
      role="alert"
    >
      <div class="alert-icon">
        <span class="svg-icon svg-icon-3x svg-icon-danger">
          <SVG src={iconSrc} />
        </span>{' '}
      </div>
      <div class="alert-text font-weight-bold">{content}</div>
      {/* <div class="alert-close">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <i class="ki ki-close"></i>
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default React.memo(MessageTile);
