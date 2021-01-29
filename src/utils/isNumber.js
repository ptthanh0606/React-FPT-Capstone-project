function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return !isNaN(parseFloat(n));
}
export default function isNumeric(str, float = false) {
  if (typeof str === 'string' && str.length === 0) return false;
  str = Number(str);
  if (str > 2147483647 || str < -2147483647) return false;
  return !isNaN(str) && (float ? isFloat(str) : isInt(str));
}
