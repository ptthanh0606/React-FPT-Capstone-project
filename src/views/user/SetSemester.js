import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useParams, useHistory } from 'react-router-dom';
import semesterAtom from 'store/semester';
import LocalStorage from 'utils/localStorage';

const SetSemester = () => {
  const { id } = useParams();
  const history = useHistory();
  const setSemester = useSetRecoilState(semesterAtom);

  React.useEffect(() => {
    LocalStorage.set('semester_id', id);

    setSemester({
      id: Number(id),
    });

    history.push('/');
  }, [history, id, setSemester]);

  return null;
};

export default SetSemester;
