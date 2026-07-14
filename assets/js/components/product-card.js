/**
 * product-card.js
 * Renders product cards, and simulates an async "fetch" from PRODUCTS
 * so the loading/error state pattern used here matches how a real
 * API call would be wired in later.
 */

/** @function 12: formatPrice - consistent currency formatting everywhere */
function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

/** @function 13: createProductCard - returns an HTML string for one product */
function createProductCard(product) {
  return `
    <div class="col-sm-6 col-lg-3">
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}" loading="lazy"
     onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27600%27 height=%27400%27%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27%23E8DBC4%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-family=%27sans-serif%27 font-size=%2724%27 fill=%27%232E1F17%27 text-anchor=%27middle%27 dy=%27.3em%27%3EDistrict Coffee Co.%3C/text%3E%3C/svg%3E';">
        <div class="product-body">
          <p class="product-tag mb-1">${product.category}</p>
          <h3 class="fs-5 mb-2">${product.name}</h3>
          <div class="price-line mb-3">
            <span class="item-name">&nbsp;</span>
            <span class="leader"></span>
            <span class="price">${formatPrice(product.price)}</span>
          </div>
          <button class="btn btn-brand w-100" onclick="addToCart('${product.id}')"
                  aria-label="Add ${product.name} to cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>`;
}

/** @function 14: fetchFeaturedProducts - simulates an async data call (Promise + delay) */
function fetchFeaturedProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const featured = PRODUCTS.filter(p => p.featured);
      if (featured.length > 0) {
        resolve(featured);
      } else {
        reject(new Error('No featured products available'));
      }
    }, 600); // brief delay so the loading state is actually visible
  });
}

/** @function 15: renderFeaturedProducts - orchestrates loading -> success/error -> render */
async function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;

  showLoadingState(container, 'Brewing up our favorites…');

  try {
    const products = await fetchFeaturedProducts();
    container.innerHTML = products.map(createProductCard).join('');
  } catch (err) {
    showErrorState(container, 'Couldn\'t load the menu right now.', renderFeaturedProducts);
  }
}

/** @function 16: showLoadingState - reusable loading UI for any container */
function showLoadingState(container, message = 'Loading…') {
  container.innerHTML = `
    <div class="loading-state w-100">
      <div class="spinner" role="status" aria-label="Loading"></div>
      <p>${message}</p>
    </div>`;
}

/** @function 17: showErrorState - reusable error UI with a retry callback */
function showErrorState(container, message, retryFn) {
  container.innerHTML = `
    <div class="error-state w-100">
      <p>${message}</p>
      <button class="retry-btn" id="retry-btn">Try again</button>
    </div>`;

  const btn = container.querySelector('#retry-btn');
  if (btn && typeof retryFn === 'function') {
    btn.addEventListener('click', retryFn);
  }
}
