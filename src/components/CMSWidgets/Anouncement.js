import React from 'react';

const Anouncement = () => {
  return (
    <div
      class="card card-custom bgi-no-repeat card-border gutter-b"
      style={{
        backgroundPosition: 'right top',
        backgroundSize: '30% auto',
        backgroundImage: 'url(assets/media/svg/shapes/abstract-4.svg)',
      }}
    >
      <div class="card-body">
        <a
          href="/"
          class="card-title font-weight-bold text-muted text-hover-primary font-size-h5"
        >
          Anouncement
        </a>

        <div class="font-weight-bolder text-success mt-9 mb-5">03 May 2020</div>

        <p class="text-dark-75 font-weight-bolder font-size-h5 m-0">
          Some important anouncement from FPTU
        </p>
      </div>
    </div>
  );
};

export default React.memo(Anouncement);
