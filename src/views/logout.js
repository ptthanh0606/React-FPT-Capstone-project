import clearAuth from 'auth/helpers/clearAuth';
import constants from 'auth/constants';
import { useHistory } from 'react-router-dom';
import LocalStorage from 'utils/localStorage';
import semesterStore from 'store/semester';
import { useSetRecoilState } from 'recoil';
import { resetState } from 'store/semester';

export default function () {
  const history = useHistory();
  const setSemester = useSetRecoilState(semesterStore);

  setSemester(resetState);
  LocalStorage.remove('semester_id');
  clearAuth();
  history.push(constants.LOGOUT_REDIRECT_TO);

  return null;
}
