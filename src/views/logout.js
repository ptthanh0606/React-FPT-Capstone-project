import clearAuth from 'auth/helpers/clearAuth';
import constants from 'auth/constants';
import { useHistory } from 'react-router-dom';
import getPath from 'utils/router/helpers/getPath';

export default function () {
  const history = useHistory();

  clearAuth();
  history.push(getPath(constants.LOGOUT_REDIRECT_TO));

  return null;
}
