/**
 * menu.js
 * Powers the full menu page: renders every product grouped by category,
 * and wires up the filter tabs (All / Coffee / Desserts).
 */

/** @function 29: renderMenuGrid - renders products into #menu-grid, optionally filtered */
function renderMenuGrid(category = 'all') {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  showLoadingState(container, 'Loading the menu…');

  setTimeout(() => {
    const products = category === 'all'
  ? getEffectiveProducts()
  : getEffectiveProducts().filter(p => p.category === category);

    if (products.length === 0) {
      showErrorState(container, 'No items match that filter.', () => renderMenuGrid('all'));
      return;
    }

    container.innerHTML = products.map(p => `
      <div class="col-sm-6 col-lg-4">
        <a href="${resolveLink('pages/product-detail.html')}?id=${p.id}" class="text-decoration-none text-reset">
          <div class="product-card">
            <img src="${p.img}" alt="${p.name}" loading="lazy"
     onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27600%27 height=%27400%27%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27%23E8DBC4%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-family=%27sans-serif%27 font-size=%2724%27 fill=%27%232E1F17%27 text-anchor=%27middle%27 dy=%27.3em%27%3EDistrict Coffee Co.%3C/text%3E%3C/svg%3E';">
            <div class="product-body">
              <p class="product-tag mb-1">${p.category}</p>
              <h3 class="fs-5 mb-2">${p.name}</h3>
              <div class="price-line">
                <span class="item-name">&nbsp;</span>
                <span class="leader"></span>
                <span class="price">${formatPrice(p.price)}</span>
              </div>
            </div>
          </div>
        </a>
      </div>`).join('');
  }, 400);
}

/** @function 30: initMenuFilters - wires the filter buttons to renderMenuGrid */
function initMenuFilters() {
  const buttons = document.querySelectorAll('.menu-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuGrid(btn.dataset.category);
    });
  });
}
