/**
 * storage.js
 * Thin wrapper around localStorage so every read/write is guarded against
 * private-browsing / quota errors, and JSON parsing happens in one place.
 */

/**
 * resolveLink - builds a correct relative path from any page, regardless of
 * where the site is hosted. Root-relative links (starting with /) break on
 * GitHub Pages project sites, since the site actually lives at
 * yourname.github.io/repo-name/ instead of the domain root.
 */
function resolveLink(path) {
  const inPages = window.location.pathname.includes('/pages/');
  if (path === 'index.html') return inPages ? '../index.html' : 'index.html';
  if (path.startsWith('pages/')) return inPages ? path.slice('pages/'.length) : path;
  return path;
}

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