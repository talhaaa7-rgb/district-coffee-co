/**
 * products.js
 * Mock product database for District Coffee Co.
 * In a real backend this would come from an API — kept as a flat array
 * here so Day 2's fetch-simulation logic has something real to load.
 */

const PRODUCTS = [
  { id: 'esp-01', name: 'Espresso', category: 'coffee', price: 3.25, featured: true,
    desc: 'Double shot, pulled slow. Our house blend, roasted weekly.',
    img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600' },
  { id: 'cor-01', name: 'Cortado', category: 'coffee', price: 4.50, featured: true,
    desc: 'Equal parts espresso and steamed milk. No foam, no fuss.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600' },
  { id: 'lat-01', name: 'Oat Milk Latte', category: 'coffee', price: 5.00, featured: true,
    desc: 'Espresso, steamed oat milk, a whisper of latte art.',
    img: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600' },
  { id: 'pour-01', name: 'Pour Over', category: 'coffee', price: 4.75, featured: false,
    desc: 'Single origin, brewed to order. Ask what\'s on the shelf today.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600' },
  { id: 'cold-01', name: 'Cold Brew', category: 'coffee', price: 4.25, featured: false,
    desc: 'Steeped 18 hours. Low acid, full body, served over ice.',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600' },
  { id: 'moc-01', name: 'Mocha', category: 'coffee', price: 5.25, featured: false,
    desc: 'Espresso, steamed milk, dark chocolate from the block, not the pump.',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600' },
  { id: 'crois-01', name: 'Almond Croissant', category: 'dessert', price: 4.75, featured: true,
    desc: 'Laminated dough, almond cream, toasted flake. Baked at 6am.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600' },
  { id: 'cook-01', name: 'Brown Butter Cookie', category: 'dessert', price: 3.50, featured: true,
    desc: 'Browned butter, flaky salt, slightly underbaked in the middle.',
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600' },
  { id: 'cake-01', name: 'Basque Cheesecake', category: 'dessert', price: 6.00, featured: false,
    desc: 'Burnt top, no crust, custard center. One slice never feels like enough.',
    img: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600' },
  { id: 'tart-01', name: 'Lemon Tart', category: 'dessert', price: 5.50, featured: false,
    desc: 'Sharp curd, torched meringue, shortcrust base.',
    img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600' },
  { id: 'scon-01', name: 'Cardamom Scone', category: 'dessert', price: 4.00, featured: false,
    desc: 'Buttery, lightly spiced, served with cultured butter.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600' },
  { id: 'bar-01', name: 'Brownie', category: 'dessert', price: 3.75, featured: false,
    desc: 'Fudgy center, crackled top, 70% dark chocolate.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600' }
];
/** @function 56: getEffectiveProducts - merges admin edits on top of the base catalog */
function getEffectiveProducts() {
  const overrides = Storage.get('dcc_product_overrides', {});
  return PRODUCTS.map(p => overrides[p.id] ? { ...p, ...overrides[p.id] } : p);
}

/** @function 57: saveProductOverride - stores an admin edit for one product */
function saveProductOverride(id, changes) {
  const overrides = Storage.get('dcc_product_overrides', {});
  overrides[id] = { ...(overrides[id] || {}), ...changes };
  Storage.set('dcc_product_overrides', overrides);
}