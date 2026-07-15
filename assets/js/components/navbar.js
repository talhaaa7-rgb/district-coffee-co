/**
 * navbar.js
 * Renders the site navbar into #navbar-root. Same component, every page —
 * change the markup once here and it updates everywhere.
 */

/** @function 3: renderNavbar - builds and injects the nav */
function renderNavbar(activePage = '') {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  const cartCount = getCartCount();
const links = [
    { href: resolveLink('index.html'), label: 'Home', key: 'home' },
    { href: resolveLink('pages/menu.html'), label: 'Menu', key: 'menu' },
    { href: resolveLink('pages/locations.html'), label: 'Locations', key: 'locations' },
    { href: resolveLink('pages/about.html'), label: 'About', key: 'about' },
    { href: resolveLink('pages/contact.html'), label: 'Contact', key: 'contact' }
  ];

  const linksHtml = links.map(link => `
    <li class="nav-item">
      <a class="nav-link nav-link-custom ${activePage === link.key ? 'active' : ''}"
         href="${link.href}" ${activePage === link.key ? 'aria-current="page"' : ''}>
        ${link.label}
      </a>
    </li>`).join('');

  root.innerHTML = `
    <nav class="navbar navbar-expand-lg dc-navbar" aria-label="Main navigation">
      <div class="container-custom d-flex align-items-center justify-content-between w-100">
        <a class="brand" href="${resolveLink('index.html')}">District Coffee Co.</a>
        <button class="navbar-toggler" type="button" aria-label="Toggle navigation"
                aria-expanded="false" aria-controls="dc-nav-collapse" id="nav-toggle-btn">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="dc-nav-collapse">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
            ${linksHtml}
            <li class="nav-item">
              <a class="nav-link nav-link-custom d-flex align-items-center" href="${resolveLink('pages/cart.html')}">
                Cart <span class="cart-badge" id="cart-count" aria-label="${cartCount} items in cart">${cartCount}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

  initMobileNavToggle();
  initScrollHeader();
}

/** @function 4: initMobileNavToggle - manual collapse toggle (no Bootstrap JS bundle dependency issues) */
function initMobileNavToggle() {
  const btn = document.getElementById('nav-toggle-btn');
  const collapse = document.getElementById('dc-nav-collapse');
  if (!btn || !collapse) return;

  btn.addEventListener('click', () => {
    const isOpen = collapse.classList.toggle('show');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
}

/** @function 5: initScrollHeader - adds shadow to navbar once user scrolls */
function initScrollHeader() {
  const nav = document.querySelector('.dc-navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });
}
