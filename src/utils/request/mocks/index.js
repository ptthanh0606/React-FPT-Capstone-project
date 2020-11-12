import MockAdapter from 'axios-mock-adapter';
import mockCustomers from './customer';

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockCustomers(mock);

  return mock;
}
