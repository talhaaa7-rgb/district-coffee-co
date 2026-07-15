# Architecture

## Overview

District Coffee Co. is a multi-page static site. There is no single-page-app router and no build step — every page is a real `.html` file, and shared UI (navbar, footer, cards) is injected via JavaScript at load time rather than duplicated in every file.

## Data Flow Diagram

```
┌─────────────────┐
│   PRODUCTS[]     │  (assets/js/data/products.js — static catalog)
└────────┬─────────┘
         │
         ▼
┌─────────────────────────┐      ┌──────────────────────────┐
│ getEffectiveProducts()   │◄─────┤ dcc_product_overrides     │
│ (merges admin edits)     │      │ (localStorage, written by │
└────────┬─────────────────┘      │  admin dashboard edits)   │
         │                        └──────────────────────────┘
         ▼
┌───────────────────────────────────────────────┐
│  Consumed by:                                  │
│  - renderFeaturedProducts()  (home page)       │
│  - renderMenuGrid()          (menu page)       │
│  - renderProductDetail()     (detail page)     │
│  - renderAdminProductsTable()(admin dashboard) │
└───────────────────────────────────────────────┘
```

```
┌──────────────┐     addToCart()      ┌─────────────────┐
│  Product UI   │ ───────────────────► │  dcc_cart         │ (localStorage)
└──────────────┘                       └────────┬─────────┘
                                                  │
                          ┌───────────────────────┼───────────────────────┐
                          ▼                       ▼                       ▼
                 renderCartPage()      getCartCount()          renderOrderSummary()
                 (cart.html)           (navbar badge,          (checkout.html)
                                        every page)
```
┌──────────────┐   handleCheckoutSubmit()   ┌───────────────────┐
│ Checkout form │ ──────────────────────────►│  dcc_last_order     │
└──────────────┘                             │  dcc_all_orders     │ (localStorage)
└─────────┬──────────┘
│
┌──────────────────────────┼──────────────────────┐
▼                          ▼                      ▼
renderConfirmation()      renderAccountPage()    renderAdminOrdersTable()
(order-confirmation.html)  (account.html)         (admin.html)
## Component Pattern

Every shared piece of UI follows the same shape: a JS function that builds an HTML string and injects it into a placeholder `<div>` that exists on every page that needs it.

| Component | Function | Placeholder |
|---|---|---|
| Navbar | `renderNavbar(activePage)` | `<div id="navbar-root">` |
| Footer | `renderFooter()` | `<div id="footer-root">` |
| Product card | `createProductCard(product)` | (returned as HTML string, joined into a grid container) |
| Toast | `showToast(message, type)` | `<div id="toast-region">` (created on first use) |
| Loading state | `showLoadingState(container, message)` | any container passed in |
| Error state | `showErrorState(container, message, retryFn)` | any container passed in |

Because `showLoadingState`/`showErrorState` take a container as an argument rather than hardcoding an ID, the same two functions serve the homepage's featured products, the full menu grid, and the locations page — one implementation, three use sites.

## Script Load Order

Scripts are loaded in dependency order on every page:

1. **Data** (`products.js`) — must load first since almost everything reads `PRODUCTS`
2. **Utils** (`storage.js`, `validators.js`, `auth.js`) — no dependencies on components
3. **Components** (`toast.js` → `cart.js` → `navbar.js` → `footer.js` → page-specific files) — `cart.js` depends on `storage.js` and `toast.js`; `navbar.js` depends on `cart.js` (for the cart count badge)
4. **`main.js`** — boots the shared navbar/footer on every page via `initPage()`
5. **Inline page script** — calls the one page-specific render function (e.g. `renderMenuGrid()`, `renderCartPage()`)

This ordering is the most common source of bugs in a vanilla-JS multi-file project: if a script is loaded out of order, or a `<script>` tag is missing entirely, the page fails silently or throws a `ReferenceError` in the console referencing a function "not defined."

## State Management

There is no framework-level state management. All persistent state lives in `localStorage`, accessed only through the `Storage.get()` / `Storage.set()` wrapper (never raw `localStorage` calls elsewhere), which centralizes JSON parsing and error handling in one place.

| Key | Shape | Written by |
|---|---|---|
| `dcc_cart` | `[{id, name, price, qty}]` | `addToCart()`, `updateCartQty()`, `removeFromCart()` |
| `dcc_last_order` / `dcc_all_orders` | order object(s) | `handleCheckoutSubmit()` |
| `dcc_current_user` | `{name, email}` | `mockLogin()`, `mockSignup()` |
| `dcc_users` | `[{name, email, password}]` | `mockSignup()` |
| `dcc_admin_session` | `{username, loggedInAt}` | `adminLogin()` |
| `dcc_product_overrides` | `{[productId]: {...changes}}` | `saveProductOverride()` (admin dashboard) |

## Why No Framework

The project requirements specify Bootstrap + custom CSS + Vanilla JS, so component reuse is achieved through plain functions and string templtemplating rather than a virtual DOM or JSX. This keeps every render function simple and traceable — one function in, one `innerHTML` assignment out — at the cost of manually re-rendering full sections rather than diffing individual DOM nodes.