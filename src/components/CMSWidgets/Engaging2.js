import React from 'react';

const Engaging2 = ({
  className = '',
  bgColor = '',
  title = '',
  textColorTitle = '',
  titleSize = '',
  textColorSubTitle = '',
  subTitle = '',
  subTitleSize = '',
  action = <></>,
  svgVariant = 1,
}) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body d-flex p-0">
        <div
          className={`flex-grow-1 bg-${bgColor} p-12 pb-40 card-rounded flex-grow-1 bgi-no-repeat`}
          style={{
            backgroundPosition: 'calc(100% + 0.5rem) bottom',
            backgroundSize: '35% auto',
            backgroundImage: `url(/media/svg/humans/custom-${svgVariant}.svg)`,
          }}
        >
          <h4
            className={`text-${textColorTitle} font-size-${titleSize} font-weight-bolder m-0`}
          >
            {title}
          </h4>

          <p
            className={`text-${textColorSubTitle} font-size-${subTitleSize} mt-5`}
          >
            {subTitle}
          </p>
          {action}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Engaging2);
