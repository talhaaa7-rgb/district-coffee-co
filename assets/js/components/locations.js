/**
 * locations.js
 * Static location data + renderer. Same loading-state pattern as
 * product data, even though this "loads" instantly — consistency
 * matters more than saving 400ms here.
 */

const LOCATIONS = [
  { name: 'District — Midtown', address: '214 Elm Street', hours: 'Mon–Fri 7:00–18:00' },
  { name: 'District — Riverside', address: '58 Harbor Lane', hours: 'Mon–Sun 7:30–17:00' },
  { name: 'District — Old Town', address: '9 Cobble Court', hours: 'Mon–Fri 6:30–17:30' }
];

/** @function 44: renderLocations - renders the location cards */
function renderLocations() {
  const container = document.getElementById('locations-grid');
  if (!container) return;

  showLoadingState(container, 'Finding our shops…');

  setTimeout(() => {
    container.innerHTML = LOCATIONS.map(loc => `
      <div class="col-md-4">
        <div class="p-4 h-100" style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
          <h3 class="fs-5 mb-2">${loc.name}</h3>
          <p class="mb-1 text-muted">${loc.address}</p>
          <p class="mb-0" style="font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--color-rust);">${loc.hours}</p>
        </div>
      </div>`).join('');
  }, 300);
}
