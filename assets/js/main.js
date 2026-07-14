/**
 * main.js
 * Runs on every page. Reads a data attribute on <body> to know which
 * nav link is "active", then boots the shared components.
 *
 * Add to <body data-page="home"> etc. on each page.
 */

/** @function 18: initPage - shared boot sequence for every page */
function initPage() {
  const page = document.body.dataset.page || '';
  renderNavbar(page);
  renderFooter();
}

/** @function 19: initSmoothAnchorScroll - smooth-scrolls in-page anchor links */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  initSmoothAnchorScroll();
});
