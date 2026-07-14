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
        <img src="${product.img}" alt="${product.name}" loading="lazy">
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
