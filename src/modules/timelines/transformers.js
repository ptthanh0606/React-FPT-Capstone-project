import React from 'react';
import { statusCSS } from './constants';

export function down(i) {
  return [
    {
      date:
        i?.semester?.assigningDate ||
        console.log('Assigning date field not found'),
      type: statusCSS[0],
      content: 'Start assigning phase',
    },
    {
      date:
        i?.semester?.assigningDate ||
        console.log('Inprogress date field not found'),
      type: statusCSS[0],
      content: 'Start In-progress phase',
    },
    {
      date:
        i?.semester?.assigningDate ||
        console.log('finished date field not found'),
      type: statusCSS[0],
      content: 'Capstone semester end',
    },
  ];
}
