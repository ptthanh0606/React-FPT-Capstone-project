import config from 'config';

function generateKey(key) {
  return `${config.name}_${key}`; // prefix_key
}

export function clear() {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
    const event = new StorageEvent('localStorage', {
      key: null,
      newValue: null,
      oldValue: null,
      url: window.location.href,
      storageArea: localStorage,
    });
    window.dispatchEvent(event);
  }
}

export function get(key, defaultValue = null) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(generateKey(key)) || defaultValue;
  }
}

export function set(key, value) {
  if (typeof localStorage !== 'undefined') {
    const k = generateKey(key);
    const event = new StorageEvent('localStorage', {
      key: k,
      newValue: value,
      oldValue: localStorage.getItem(k),
      url: window.location.href,
      storageArea: localStorage,
    });
    localStorage.setItem(k, value);
    window.dispatchEvent(event);
  }
}

export function remove(key) {
  if (typeof localStorage !== 'undefined') {
    const k = generateKey(key);
    const event = new StorageEvent('localStorage', {
      key: k,
      newValue: null,
      oldValue: localStorage.getItem(k),
      url: window.location.href,
      storageArea: localStorage,
    });
    localStorage.removeItem(k);
    window.dispatchEvent(event);
  }
}

export default {
  clear,
  get,
  set,
  remove,
};
