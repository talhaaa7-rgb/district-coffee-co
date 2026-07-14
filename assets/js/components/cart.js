/**
 * cart.js
 * Minimal cart logic needed for Day 1 (badge count + add-to-cart from
 * the homepage). Full cart/checkout page logic lands Day 2.
 */

const CART_KEY = 'dcc_cart';

/** @function 9: getCart - reads the cart array from storage */
function getCart() {
  return Storage.get(CART_KEY, []);
}

/** @function 10: getCartCount - total item quantity, for the navbar badge */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/** @function 11: addToCart - adds a product (or increments qty) and updates UI */
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    showToast('That item could not be found.', 'error');
    return;
  }

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty });
  }
  Storage.set(CART_KEY, cart);

  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();

  showToast(`${product.name} added to cart`, 'success');
}

/** @function 24: removeFromCart - removes one line item entirely */
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  Storage.set(CART_KEY, cart);
  renderCartPage();
  showToast('Item removed', 'default');
}

/** @function 25: updateCartQty - sets a line item's quantity (removes if 0 or less) */
function updateCartQty(productId, qty) {
  qty = Math.max(0, parseInt(qty, 10) || 0);
  let cart = getCart();

  if (qty === 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.qty = qty;
  }

  Storage.set(CART_KEY, cart);
  renderCartPage();
}

/** @function 26: getCartTotal - sums price * qty across the cart */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

/** @function 27: clearCart - empties the cart, used after a successful order */
function clearCart() {
  Storage.set(CART_KEY, []);
}

/** @function 28: renderCartPage - full cart view: line items, totals, or empty state */
function renderCartPage() {
  const container = document.getElementById('cart-root');
  if (!container) return;

  const cart = getCart();
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="font-display fs-3 mb-3">Your cart is empty</p>
        <p class="text-muted mb-4">Nothing here yet — go find something good.</p>
        <a href="/pages/menu.html" class="btn btn-brand">Browse the menu</a>
      </div>`;
    return;
  }

  const rows = cart.map(item => `
    <div class="row align-items-center py-3 border-bottom cart-line" data-id="${item.id}">
      <div class="col-5 col-md-6">
        <p class="mb-0 fw-semibold">${item.name}</p>
        <p class="mb-0 text-muted" style="font-family: var(--font-mono); font-size: var(--fs-sm);">${formatPrice(item.price)} each</p>
      </div>
      <div class="col-4 col-md-3">
        <input type="number" min="0" value="${item.qty}"
               class="form-control qty-input" aria-label="Quantity for ${item.name}"
               onchange="updateCartQty('${item.id}', this.value)">
      </div>
      <div class="col-2 col-md-2 text-end" style="font-family: var(--font-mono);">
        ${formatPrice(item.price * item.qty)}
      </div>
      <div class="col-1 text-end">
        <button class="btn btn-sm btn-link text-danger p-0" aria-label="Remove ${item.name}"
                onclick="removeFromCart('${item.id}')">&times;</button>
      </div>
    </div>`).join('');

  const total = getCartTotal();

  container.innerHTML = `
    <div class="row">
      <div class="col-lg-8">${rows}</div>
      <div class="col-lg-4">
        <div class="p-4" style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
          <div class="price-line mb-3">
            <span class="item-name">Subtotal</span><span class="leader"></span>
            <span class="price">${formatPrice(total)}</span>
          </div>
          <p class="text-muted mb-4" style="font-size: var(--fs-sm);">Tax calculated at checkout.</p>
          <a href="/pages/checkout.html" class="btn btn-brand w-100">Checkout</a>
        </div>
      </div>
    </div>`;
}
