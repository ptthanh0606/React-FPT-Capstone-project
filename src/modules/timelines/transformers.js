import React from 'react';
import { statusCSS } from './constants';

export function down(i) {
  let timelines = [];

  timelines.push(
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
    }
  );

  let temp = i?.evaluations
    ?.map(j => [
      {
        date: j.submitDueDate,
        type: statusCSS[1],
        content: `Finish all the work for checkpoint "${j.checkpoint.name}"`,
      },
      {
        date: j.evaluateDueDate,
        type: statusCSS[2],
        content: `Checkpoint "${j.checkpoint.name}" evaluation meeting with`,
      },
    ])
    .map(k => {
      k.map(l => timelines.push(l));
    });

  timelines.push({
    date:
      i?.semester?.assigningDate ||
      console.log('finished date field not found'),
    type: statusCSS[0],
    content: 'Capstone semester end',
  });

  return timelines;
}
