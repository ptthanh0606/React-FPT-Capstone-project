import React from 'react';

const Engaging = ({ className = '' }) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body d-flex p-0">
        <div
          className="flex-grow-1 p-12 card-rounded bgi-no-repeat d-flex flex-column justify-content-center align-items-start"
          style={{
            backgroundColor: '#BBDBFB',
            backgroundPosition: 'right bottom',
            backgroundSize: 'auto 100%',
            backgroundImage: 'url(/media/svg/humans/custom-8.svg)',
          }}
        >
          <h4 className="text-primary font-weight-bolder m-0">Quick guide</h4>

          <p className="text-dark mt-5 font-size-xl font-weight-bold">
            Discuss with your team to find <b>the best topic</b> for you all to
            handle.
            <br />
            Pick one of the topic with the <b>Ready</b> status below to start.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Engaging;
