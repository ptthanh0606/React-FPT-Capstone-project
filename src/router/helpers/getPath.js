import { routes } from '..';

export default function getPath(name, many = false) {
  const paths = routes.get(name);
  if (paths === undefined) return;

  if (many) {
    if (Array.isArray(paths)) return paths;
    return [String(paths)];
  }

  if (Array.isArray(paths)) return paths[0];
  return String(paths);
}
