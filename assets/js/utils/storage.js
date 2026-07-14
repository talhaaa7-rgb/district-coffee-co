/**
 * storage.js
 * Thin wrapper around localStorage so every read/write is guarded against
 * private-browsing / quota errors, and JSON parsing happens in one place.
 */

const Storage = {
  /** @function 1: get - safely read + parse a key */
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.warn(`Storage.get failed for "${key}":`, err);
      return fallback;
    }
  },

  /** @function 2: set - safely stringify + write a key */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Storage.set failed for "${key}":`, err);
      return false;
    }
  }
};
