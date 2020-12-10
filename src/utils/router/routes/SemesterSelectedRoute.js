import React from 'react';
import ConditionalRoute from './ConditionalRoute';

import semesterAtom from 'store/semester';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute({ ...rest }) {
  const semester = useRecoilValue(semesterAtom);

  const config = {
    ...rest,
    condition:
      semester.id && semester.id !== 0 && Number.isInteger(semester.id),
    redirectTo: '/select-semester',
    reason: 'You must select a semester before continuing.',
  };

  return <ConditionalRoute {...config} />;
}
