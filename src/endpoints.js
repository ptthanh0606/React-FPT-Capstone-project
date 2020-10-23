import config from 'config';
import { METHOD } from 'utils/request/constants';

export const LOGIN = {
  url: config.api + 'Authentication',
  method: METHOD.POST,
};
