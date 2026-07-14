/**
 * product-detail.js
 * Reads the product id from the URL query string and renders a single
 * product detail view, with the same loading/error pattern as everywhere else.
 */

/** @function 31: getProductIdFromURL - reads ?id=xyz from the current page URL */
function getProductIdFromURL() {
  return new URLSearchParams(window.location.search).get('id');
}

/** @function 32: renderProductDetail - loads and displays one product, or an error */
function renderProductDetail() {
  const container = document.getElementById('product-detail-root');
  if (!container) return;

  showLoadingState(container, 'Loading item…');

  setTimeout(() => {
    const id = getProductIdFromURL();
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
      showErrorState(container, 'We couldn\'t find that item.', null);
      const btn = container.querySelector('#retry-btn');
      if (btn) btn.remove(); // no sensible retry — send them back to the menu instead
      container.insertAdjacentHTML('beforeend',
        `<div class="text-center"><a href="/pages/menu.html" class="btn btn-brand mt-2">Back to menu</a></div>`);
      return;
    }

    container.innerHTML = `
      <div class="row g-5 align-items-start">
        <div class="col-md-6">
          <img src="${product.img}" alt="${product.name}" class="img-fluid rounded" style="border-radius: var(--radius-md);">
        </div>
        <div class="col-md-6">
          <p class="product-tag mb-2">${product.category}</p>
          <h1 class="font-display mb-3">${product.name}</h1>
          <p class="lede mb-4" style="color: var(--color-espresso-light);">${product.desc}</p>
          <div class="price-line mb-4">
            <span class="item-name">Price</span><span class="leader"></span>
            <span class="price fs-4">${formatPrice(product.price)}</span>
          </div>
          <button class="btn btn-brand" onclick="addToCart('${product.id}')">Add to cart</button>
        </div>
      </div>`;
  }, 400);
}
