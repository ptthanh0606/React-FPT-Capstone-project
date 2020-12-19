import React from 'react';
import { statusCSS } from './constants';

export function down(i) {
  let content = '';
  if (i.status === 0) {
    content = '';
  } else if (i.status === 1) {
    content = <>Reports due date for {i?.name}</>;
  } else if (i.status === 2) {
    content = (
      <>
        Checkpoint 1 meeting for evaluation with{' '}
        {i?.council?.members?.map(member => member.name + ' ')}
      </>
    );
  } else console.log('status field not found');

  return {
    date: '',
    type: statusCSS[i?.status],
    content: content,
  };
}
