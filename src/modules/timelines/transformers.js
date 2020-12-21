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

export function downLecturer(i) {
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

  const evals = [];

  for (const j of i?.topics) {
    for (const g of j?.evaluations) {
      evals.push({
        date: g.submitDueDate,
        content: 'Submit ' + g.checkpoint.name + ' for topic ' + j?.name,
        type: statusCSS[1],
      });
      evals.push({
        date: g.evaluateDueDate,
        type: statusCSS[2],
        content:
          'Checkpoint ' +
          g.checkpoint.name +
          ' of topic ' +
          j?.name +
          ' is evaluated',
      });
    }
  }

  evals.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate > bDate) return 1;
    if (bDate > aDate) return -1;
    return 1;
  });

  timelines.push(...evals);

  timelines.push({
    date:
      i?.semester?.finishedDate || console.log('finished date field not found'),
    type: statusCSS[0],
    content: 'Capstone semester end',
  });

  return timelines;
}
