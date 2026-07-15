/**
 * order-confirmation.js
 * Reads the last order out of storage and the order id out of the URL,
 * and displays a confirmation summary.
 */

/** @function 36: renderConfirmation - shows order id + summary, or a fallback if none found */
function renderConfirmation() {
  const container = document.getElementById('confirmation-root');
  if (!container) return;

  const orderId = new URLSearchParams(window.location.search).get('order');
  const order = Storage.get('dcc_last_order');

  if (!order || order.id !== orderId) {
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="font-display fs-3 mb-3">We couldn't find that order</p>
        <a href="${resolveLink('pages/menu.html')}" class="btn btn-brand">Back to menu</a>
      </div>`;
    return;
  }

  const rows = order.items.map(item => `
    <div class="price-line mb-2">
      <span class="item-name">${item.name} &times;${item.qty}</span>
      <span class="leader"></span>
      <span class="price">${formatPrice(item.price * item.qty)}</span>
    </div>`).join('');

  container.innerHTML = `
    <div class="text-center mb-5">
      <p class="eyebrow mb-2">Thank you, ${order.name.split(' ')[0]}</p>
      <h1 class="font-display mb-2">Order confirmed</h1>
      <p class="text-muted" style="font-family: var(--font-mono);">Order #${order.id}</p>
    </div>
    <div class="mx-auto" style="max-width: 480px;">
      ${rows}
      <hr>
      <div class="price-line">
        <span class="item-name fw-bold">Total</span><span class="leader"></span>
        <span class="price fs-5">${formatPrice(order.total)}</span>
      </div>
    </div>
    <div class="text-center mt-5 d-flex gap-3 justify-content-center flex-wrap">
      <button class="btn btn-brand" onclick="reorderLastOrder()">Order again</button>
      <a href="${resolveLink('index.html')}" class="btn btn-brand-outline" style="border-color: var(--color-rust); color: var(--color-rust);">Back to home</a>
    </div>`;
}

/** @function 46: reorderLastOrder - refills the cart with the last order's items and goes to cart */
function reorderLastOrder() {
  const order = Storage.get('dcc_last_order');
  if (!order) return;

  Storage.set(CART_KEY, order.items.map(item => ({
    id: item.id, name: item.name, price: item.price, qty: item.qty
  })));

  showToast('Your last order has been added to your cart', 'success');
  window.location.href = resolveLink('pages/cart.html');
}