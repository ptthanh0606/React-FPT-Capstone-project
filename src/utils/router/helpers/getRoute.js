import { inverseRoutes } from 'App';

export default function getRoute(path) {
  return inverseRoutes.get(path);
}
