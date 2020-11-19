import config from 'config';
import { METHOD } from 'utils/request/constants';

export const LOGIN = {
  url: config.api + 'authentication',
  method: METHOD.POST,
};

export const ME = {
  url: config.api + 'authentication/me',
  method: METHOD.GET,
};
