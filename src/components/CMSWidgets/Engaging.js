import React from 'react';

const Engaging = ({
  className = '',
  bgColor = '',
  bgSize = '25%',
  imageUrl = '',
  title = '',
  textColorTitle = '',
  titleSize = '',
  textColorSubTitle = '',
  subTitle = '',
  subTitleSize = '',
  action = <></>,
}) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body d-flex p-0">
        <div
          className="flex-grow-1 p-12 card-rounded bgi-no-repeat d-flex flex-column justify-content-center align-items-start"
          style={{
            backgroundColor: bgColor,
            backgroundPosition: `calc(100% + 0.5rem) bottom`,
            backgroundSize: `${bgSize} auto`,
            backgroundImage: `url(${imageUrl})`,
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

export default React.memo(Engaging);
