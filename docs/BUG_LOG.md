# Bug Log

## BUG-001: Cascading blank pages (menu grid, order confirmation, account page not rendering)
- **Severity:** Critical
- **Symptom:** Menu page showed filter buttons but no products; order confirmation and account pages showed nothing at all.
- **Root cause:** `index.html` had been partially pasted, missing its closing section tags and its entire `<script>` block — meaning zero JavaScript loaded on that page. Confirmed via DevTools Network tab showing every JS file returning 404.
- **Fix:** Rebuilt and re-verified `index.html` in full; confirmed script load order (data → utils → components → main) matched across all pages.
- **Status:** Resolved.

## BUG-002: Zip extraction created nested duplicate folder, `assets/js` missing entirely
- **Severity:** Critical
- **Symptom:** After a "merge/replace" extraction, `assets/` only contained a `css` folder — no `js` folder — causing every script to 404 again.
- **Root cause:** Windows Explorer's merge-extract silently failed to copy the `js` subfolder; a separate extraction attempt created `district-coffee-co/district-coffee-co/` nesting instead of a clean single folder.
- **Fix:** Deleted the corrupted folder entirely and re-extracted fresh from the verified zip, then opened the correct inner folder in VS Code.
- **Status:** Resolved.

## BUG-003: Missing product images for Mocha and Lemon Tart
- **Severity:** Low
- **Symptom:** Two menu items showed broken image icons instead of photos.
- **Root cause:** Two Unsplash photo URLs in `products.js` were invalid/dead links.
- **Fix:** Replaced both URLs with working images, and added an `onerror` fallback (inline SVG placeholder) to every product `<img>` tag across `product-card.js`, `menu.js`, and `product-detail.js` so any future dead link degrades gracefully instead of showing a broken-image icon.
- **Status:** Resolved.

## BUG-004: Order confirmation page — `Uncaught ReferenceError: formatPrice is not defined`
- **Severity:** High
- **Symptom:** After completing checkout, the confirmation page rendered nothing.
- **Root cause:** `order-confirmation.html` called `renderConfirmation()`, which uses `formatPrice()` — but the page never loaded `product-card.js`, the file `formatPrice` actually lives in.
- **Fix:** Added the missing `<script src="../assets/js/components/product-card.js"></script>` tag to `order-confirmation.html`.
- **Status:** Resolved.

## BUG-005: Admin login form did nothing on submit
- **Severity:** High
- **Symptom:** Clicking "Log in" on the admin login page caused a full page reload with `?` appended to the URL, but no login occurred and no console error appeared.
- **Root cause:** The inline `<script>` block that attached `handleAdminLoginSubmit` to the form's submit event never made it into the saved file, so the browser fell back to a native (unhandled) form submission.
- **Fix:** Replaced the entire `admin-login.html` file cleanly to guarantee the event listener was correctly attached.
- **Status:** Resolved.

## BUG-006: Admin dashboard had no access control
- **Severity:** Medium
- **Symptom:** Anyone with the direct URL could view `/pages/admin.html` without logging in.
- **Root cause:** Dashboard was built before its login/session-check was designed.
- **Fix:** Added `initAdminGuard()`, called at the top of the dashboard's init script, which redirects to `admin-login.html` if no valid `dcc_admin_session` exists.
- **Status:** Resolved.

## BUG-007: Mobile nav menu open by default instead of collapsed
- **Severity:** Medium
- **Symptom:** On mobile/tablet widths, all nav links appeared immediately instead of being hidden behind the hamburger icon.
- **Root cause:** Bootstrap's default `.collapse` hidden state wasn't reliably applying in the dev environment.
- **Fix:** Added an explicit `@media (max-width: 991.98px)` rule in `components.css` forcing `.navbar-collapse` to `display: none` by default and `display: block` only when `.show` is present.
- **Status:** Resolved.

## Known Non-Bugs (documented limitations, not defects)
- Contact form does not send real email (no backend).
- Customer and admin auth are mocked, storing credentials in plain text in `localStorage` — acceptable only for this demo, never in production.
- Admin dashboard data (orders, product edits) only reflects the current browser's `localStorage` and does not sync across devices.