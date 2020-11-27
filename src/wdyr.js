import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const Recoil = require('recoil');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
      // [Recoil, 'useRecoilValue'],
      // [Recoil, 'useRecoilState'],
    ],
  });
}
