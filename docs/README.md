# District Coffee Co.

A responsive, production-style front-end for a coffee & dessert café, built with **Bootstrap 5**, custom CSS, and **Vanilla JavaScript** (no frameworks). Includes a full customer ordering flow, mock authentication, and a staff admin dashboard.

## Live Structure

- **14 pages**: Home, Menu, Product Detail, Cart, Checkout, Order Confirmation, About, Contact, Locations, Login, Signup, Account, Admin Login, Admin Dashboard
- **60 JavaScript functions** across data, utility, and component modules
- **Reusable components**: navbar, footer, product cards, toasts, loading/error states — each rendered by a dedicated JS function and shared across every page
- Fully responsive (Bootstrap grid + custom breakpoints in `responsive.css`)
- Accessible: skip-to-content link, visible focus states, ARIA labels on interactive elements, `aria-live` toast region

## Folder Structure
district-coffee-co/
├── index.html
├── pages/
│   ├── menu.html, product-detail.html, cart.html, checkout.html, order-confirmation.html
│   ├── about.html, contact.html, locations.html
│   ├── login.html, signup.html, account.html
│   └── admin-login.html, admin.html
├── assets/
│   ├── css/          variables.css, main.css, components.css, responsive.css
│   ├── js/
│   │   ├── data/      products.js
│   │   ├── utils/      storage.js, validators.js, auth.js
│   │   └── components/ navbar.js, footer.js, cart.js, toast.js, product-card.js,
│   │                    menu.js, product-detail.js, checkout.js,
│   │                    order-confirmation.js, contact.js, locations.js,
│   │                    account.js, admin.js
│   └── main.js
└── docs/
├── README.md, ARCHITECTURE.md, PROMPT_LOG.md, BUG_LOG.md

## How to Run

This is a static site — no build step, no server required for basic viewing, but a local server is recommended so root-relative links (`/pages/...`) resolve correctly:

1. Open the project folder in VS Code
2. Install the "Live Server" extension (if not already installed)
3. Right-click `index.html` → **Open with Live Server**
4. Site opens at `http://127.0.0.1:5500`

## Demo Accounts

- **Customer account**: create your own via Sign Up (`/pages/signup.html`) — stored in `localStorage`, not a real backend
- **Admin dashboard**: `/pages/admin-login.html` — username `admin@districtcoffee.com`, password `admin123`

## Known Limitations (by design, not oversight)

- **No real backend.** Cart, orders, accounts, and product edits are all stored in the browser's `localStorage`. Nothing syncs across devices or browsers.
- **Mock authentication.** Both customer and admin login store credentials in plain text in `localStorage`. This is acceptable only because there is no real user data at stake in this demo — never do this in a production app.
- **Contact form doesn't send email.** It validates and shows a success message, but there's no mail service wired up.
- **Product images** are hotlinked from Unsplash; a graceful SVG placeholder shows if any link breaks.

## Tech Stack

- Bootstrap 5.3.3 (grid + base components, via CDN)
- Custom CSS with a token-based design system (`variables.css`)
- Vanilla JavaScript (ES6+), no build tools, no frameworks
- Fonts: Fraunces (display), Work Sans (body), Space Mono (prices/labels)