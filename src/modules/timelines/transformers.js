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
        i?.semester?.inProgressDate ||
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
        content: (
          <span>
            Finish all the work for checkpoint <b>"{j.checkpoint.name}"</b>
          </span>
        ),
      },
      {
        date: j.evaluateDueDate,
        type: statusCSS[2],
        content: (
          <span>
            Checkpoint <b>"{j.checkpoint.name}"</b> evaluation meeting with{' '}
            <b>"{j.council.name}"</b>
          </span>
        ),
      },
    ])
    .map(k => {
      k.map(l => timelines.push(l));
    });

  timelines.push({
    date:
      i?.semester?.finishedDate || console.log('finished date field not found'),
    type: statusCSS[0],
    content: 'Capstone semester end',
  });

  return timelines;
}
