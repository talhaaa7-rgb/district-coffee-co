/**
 * validators.js
 * Small, dependency-free form validation helpers. Every checkout/contact
 * form in the app uses the same three functions instead of writing
 * one-off validation logic per page.
 */

/** @function 20: isValidEmail - basic but reliable email shape check */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** @function 21: isRequired - true if a field has non-whitespace content */
function isRequired(value) {
  return value !== undefined && value !== null && value.trim().length > 0;
}

/** @function 22: showFieldError - marks a field invalid and shows a message under it */
function showFieldError(inputEl, message) {
  inputEl.classList.add('is-invalid');
  let feedback = inputEl.parentElement.querySelector('.invalid-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    inputEl.parentElement.appendChild(feedback);
  }
  feedback.textContent = message;
}

/** @function 23: clearFieldError - resets a field back to valid state */
function clearFieldError(inputEl) {
  inputEl.classList.remove('is-invalid');
  const feedback = inputEl.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = '';
}
