/**
 * toast.js
 * A lightweight, accessible toast/notification system.
 * Call showToast('Added to cart', 'success') from anywhere.
 */

/** @function 8: showToast - renders a dismissing notification */
function showToast(message, type = 'default', duration = 3000) {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.appendChild(region);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type !== 'default' ? 'toast-' + type : ''}`;
  toast.textContent = message;
  region.appendChild(toast);

  setTimeout(() => toast.remove(), duration);
}
