import clearAuth from 'auth/helpers/clearAuth';
import constants from 'auth/constants';
import { useHistory } from 'react-router-dom';

export default function () {
  const history = useHistory();

  clearAuth();
  history.push(constants.LOGOUT_REDIRECT_TO);

  return null;
}
