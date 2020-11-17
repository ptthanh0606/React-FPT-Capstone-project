import clearAuth from 'auth/helpers/clearAuth';
import constants from 'auth/constants';
import { useHistory } from 'react-router-dom';
import LocalStorage from 'utils/localStorage';

export default function () {
  const history = useHistory();

  LocalStorage.remove('semester_id');
  clearAuth();
  history.push(constants.LOGOUT_REDIRECT_TO);

  return null;
}
