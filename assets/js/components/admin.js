/**
 * admin.js
 * Powers the admin dashboard: summary stats, a table of every order
 * placed this session, and a read-only view of the product catalog.
 * Data is real (drawn from localStorage + PRODUCTS) but only reflects
 * orders placed in this browser, since there's no shared backend.
 */
/** @function 55: initAdminGuard - redirects to admin login if no admin session exists */
function initAdminGuard() {
  if (!getAdminSession()) {
    window.location.href = '/pages/admin-login.html';
    return false;
  }
  return true;
}

/** @function 47: getAllOrders - reads the full order history from storage */
function getAllOrders() {
  return Storage.get('dcc_all_orders', []);
}

/** @function 48: renderAdminStats - shows order count, revenue, and catalog size */
function renderAdminStats() {
  const container = document.getElementById('admin-stats');
  if (!container) return;

  const orders = getAllOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;

  const stats = [
    { label: 'Orders placed', value: orders.length },
    { label: 'Total revenue', value: formatPrice(totalRevenue) },
    { label: 'Average order', value: formatPrice(avgOrder) },
    { label: 'Menu items', value: PRODUCTS.length }
  ];

  container.innerHTML = stats.map(s => `
    <div class="col-6 col-md-3">
      <div class="p-4" style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        <p class="mb-1" style="font-family: var(--font-mono); font-size: var(--fs-xs); text-transform: uppercase; color: var(--color-rust); letter-spacing: 0.06em;">${s.label}</p>
        <p class="font-display fs-3 mb-0">${s.value}</p>
      </div>
    </div>`).join('');
}

/** @function 49: renderAdminOrdersTable - lists every order placed this session, or an empty state */
function renderAdminOrdersTable() {
  const container = document.getElementById('admin-orders');
  if (!container) return;

  const orders = getAllOrders();

  if (orders.length === 0) {
    container.innerHTML = `<p class="text-muted">No orders placed yet this session. Place a test order from checkout to see it here.</p>`;
    return;
  }

  const rows = orders.map(o => `
    <tr>
      <td style="font-family: var(--font-mono);">${o.id}</td>
      <td>${o.name}</td>
      <td>${o.items.reduce((sum, i) => sum + i.qty, 0)} items</td>
      <td>${formatPrice(o.total)}</td>
      <td class="text-muted">${new Date(o.date).toLocaleString()}</td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/** @function 50: renderAdminProductsTable - read-only view of the full menu catalog */
function renderAdminProductsTable() {
  const container = document.getElementById('admin-products');
  if (!container) return;

  const rows = PRODUCTS.map(p => `
    <tr>
      <td>${p.name}</td>
      <td class="text-capitalize">${p.category}</td>
      <td style="font-family: var(--font-mono);">${formatPrice(p.price)}</td>
      <td>${p.featured ? '<span class="badge" style="background: var(--color-forest);">Featured</span>' : ''}</td>
    </tr>`).join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th></th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}