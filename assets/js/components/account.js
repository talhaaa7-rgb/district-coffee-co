/**
 * account.js
 * Renders the account page for the current mock session: name, email,
 * and their last order (if any). Redirects to login if no session exists.
 */

/** @function 45: renderAccountPage - shows user info + order history, or redirects to login */
function renderAccountPage() {
  const container = document.getElementById('account-root');
  if (!container) return

  const user = getCurrentUser();
  if (!user) {
    window.location.href = resolveLink('pages/login.html');
    return;
  }

  const lastOrder = Storage.get('dcc_last_order');
  const orderHtml = lastOrder ? `
    <div class="p-4 mt-4" style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
      <p class="eyebrow mb-3">Last order — #${lastOrder.id}</p>
      ${lastOrder.items.map(item => `
        <div class="price-line mb-2">
          <span class="item-name">${item.name} &times;${item.qty}</span>
          <span class="leader"></span>
          <span class="price">${formatPrice(item.price * item.qty)}</span>
        </div>`).join('')}
      <hr>
      <div class="price-line">
        <span class="item-name fw-bold">Total</span><span class="leader"></span>
        <span class="price">${formatPrice(lastOrder.total)}</span>
      </div>
    </div>` : `
    <p class="text-muted mt-4">No orders yet. <a href="${resolveLink('pages/menu.html')}">Browse the menu</a>.</p>`;

  container.innerHTML = `
    <p class="eyebrow mb-2">Account</p>
    <h1 class="font-display mb-1">${user.name}</h1>
    <p class="text-muted mb-4">${user.email}</p>
    <button class="btn btn-brand-outline" style="border-color: var(--color-rust); color: var(--color-rust);" onclick="logout()">Log out</button>
    ${orderHtml}`;
}
