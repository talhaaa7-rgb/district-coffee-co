/**
 * checkout.js
 * Renders the order summary, validates the checkout form, and "submits"
 * the order (clears cart + redirects to confirmation with an order id).
 */

/** @function 33: renderOrderSummary - shows cart contents + total on the checkout page */
function renderOrderSummary() {
  const container = document.getElementById('order-summary');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Your cart is empty. <a href="/pages/menu.html">Browse the menu</a>.</p>`;
    const submitBtn = document.getElementById('place-order-btn');
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  const rows = cart.map(item => `
    <div class="price-line mb-2">
      <span class="item-name">${item.name} &times;${item.qty}</span>
      <span class="leader"></span>
      <span class="price">${formatPrice(item.price * item.qty)}</span>
    </div>`).join('');

  container.innerHTML = `
    ${rows}
    <hr>
    <div class="price-line">
      <span class="item-name fw-bold">Total</span><span class="leader"></span>
      <span class="price fs-5">${formatPrice(getCartTotal())}</span>
    </div>`;
}

/** @function 34: validateCheckoutForm - checks required fields + email shape, flags bad ones */
function validateCheckoutForm(form) {
  let valid = true;
  const name = form.querySelector('#checkout-name');
  const email = form.querySelector('#checkout-email');
  const address = form.querySelector('#checkout-address');

  [name, email, address].forEach(clearFieldError);

  if (!isRequired(name.value)) {
    showFieldError(name, 'Please enter your name.');
    valid = false;
  }
  if (!isRequired(email.value) || !isValidEmail(email.value)) {
    showFieldError(email, 'Please enter a valid email.');
    valid = false;
  }
  if (!isRequired(address.value)) {
    showFieldError(address, 'Please enter a pickup or delivery address.');
    valid = false;
  }

  return valid;
}

/** @function 35: handleCheckoutSubmit - validates, then "places" the order */
function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!validateCheckoutForm(form)) {
    showToast('Please fix the highlighted fields.', 'error');
    return;
  }

 const orderId = 'DCC-' + Math.floor(100000 + Math.random() * 900000);
  const order = {
    id: orderId,
    items: getCart(),
    total: getCartTotal(),
    name: form.querySelector('#checkout-name').value.trim(),
    date: new Date().toISOString()
  };

  Storage.set('dcc_last_order', order);

  const allOrders = Storage.get('dcc_all_orders', []);
  allOrders.unshift(order); // newest first
  Storage.set('dcc_all_orders', allOrders);

  clearCart();
  window.location.href = `/pages/order-confirmation.html?order=${orderId}`;
}
