/**
 * contact.js
 * Contact form handling. Reuses the same validators as checkout/signup
 * rather than writing new validation logic for a third form.
 */

/** @function 43: handleContactSubmit - validates the contact form and shows a success state */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#contact-name');
  const email = form.querySelector('#contact-email');
  const message = form.querySelector('#contact-message');

  [name, email, message].forEach(clearFieldError);
  let valid = true;

  if (!isRequired(name.value)) {
    showFieldError(name, 'Enter your name.');
    valid = false;
  }
  if (!isRequired(email.value) || !isValidEmail(email.value)) {
    showFieldError(email, 'Enter a valid email.');
    valid = false;
  }
  if (!isRequired(message.value)) {
    showFieldError(message, 'Enter a message.');
    valid = false;
  }
  if (!valid) return;

  form.reset();
  showToast('Message sent — we\'ll get back to you soon.', 'success');
}
