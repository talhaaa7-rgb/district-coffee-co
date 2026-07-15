/**
 * footer.js
 * Renders the site footer into #footer-root.
 */

/** @function 6: renderFooter - builds and injects the footer, including live year */
function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;

  root.innerHTML = `
    <footer class="dc-footer">
      <div class="container-custom">
        <div class="row g-4">
          <div class="col-md-4">
            <p class="font-display fs-4 mb-2">District Coffee Co.</p>
            <p class="opacity-75">Coffee and desserts, made in small batches, served in one room.</p>
          </div>
          <div class="col-6 col-md-2">
            <p class="footer-heading">Visit</p>
            <p class="mb-1"><a href="/pages/locations.html">Locations</a></p>
            <p class="mb-1"><a href="/pages/menu.html">Menu</a></p>
          </div>
          <div class="col-6 col-md-2">
            <p class="footer-heading">Company</p>
            <p class="mb-1"><a href="/pages/about.html">About</a></p>
            <p class="mb-1"><a href="/pages/contact.html">Contact</a></p>
          </div>
          <div class="col-md-4">
            <p class="footer-heading">Hours</p>
            <p class="mb-1">Mon–Fri &nbsp;7:00–18:00</p>
            <p class="mb-1">Sat–Sun &nbsp;8:00–17:00</p>
          </div>
        </div>
        <hr class="mt-5" style="border-color: var(--color-border-dark);">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p class="opacity-50 mb-0" style="font-size: var(--fs-sm);">
            &copy; <span id="footer-year"></span> District Coffee Co. All rights reserved.
          </p>
          <a href="/district-coffee-co/pages/admin-login.html" class="opacity-50" style="font-size: var(--fs-sm);">Staff login</a>
        </div>
      </div>
    </footer>`;

  updateFooterYear();
}

/** @function 7: updateFooterYear - keeps copyright year current with no manual edits */
function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
