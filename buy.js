// ============================================
// Mua iPad Air – Configurator logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const fmt = (n) => n.toLocaleString('vi-VN') + '\u20AB';

  /* ---------- State & pricing data ---------- */
  const state = {
    size: '11',        // '11' | '13'
    color: 'blue',      // blue | purple | starlight | spacegray
    storage: '128',     // 128 | 256 | 512 | 1024
    connectivity: 'wifi', // wifi | cellular
    pencil: 'none',      // none | pro | usbc
    keyboard: 'none',    // none | magic
    applecare: 'none',   // none | applecare | theft
  };

  const basePrice = { '11': 16999000, '13': 22499000 };
  const storageDelta = { '128': 0, '256': 4000000, '512': 8500000, '1024': 12500000 };
  const connectivityDelta = { wifi: 0, cellular: 4500000 };
  const pencilPrice = { none: 0, pro: 3190000, usbc: 1990000 };
  const keyboardPrice = { none: 0, magic: 7990000 };
  const applecarePrice = { none: 0, applecare: 2990000, theft: 4290000 };

  const galleryImages = {
    blue: { src: 'assets/ipad-color-blue.png', grayscale: false, label: 'Xanh Dương' },
    purple: { src: 'assets/ipad-color-purple.png', grayscale: false, label: 'Tím' },
    starlight: { src: 'assets/ipad-color-starlight.png', grayscale: false, label: 'Ánh Sao' },
    spacegray: { src: 'assets/buy/hero-ipadair-blue.png', grayscale: true, label: 'Xám Không Gian' },
  };

  /* ---------- Elements ---------- */
  const sizeCards = document.querySelectorAll('[data-role="size"]');
  const colorSwatches = document.querySelectorAll('[data-role="color"]');
  const storageCards = document.querySelectorAll('[data-role="storage"]');
  const connCards = document.querySelectorAll('[data-role="connectivity"]');
  const pencilCards = document.querySelectorAll('[data-role="pencil"]');
  const keyboardCards = document.querySelectorAll('[data-role="keyboard"]');
  const applecareCards = document.querySelectorAll('[data-role="applecare"]');

  const galleryImg = document.getElementById('galleryImage');
  const colorLabel = document.getElementById('colorLabel');
  const summaryPrice = document.getElementById('summaryPrice');
  const headerPrice = document.getElementById('headerPrice');

  /* ---------- Helpers ---------- */
  function selectCard(list, value, attr = 'data-value') {
    list.forEach((el) => {
      el.classList.toggle('selected', el.getAttribute(attr) === value);
    });
  }

  function updateGallery() {
    const info = galleryImages[state.color];
    if (!galleryImg || !info) return;
    galleryImg.style.opacity = 0;
    setTimeout(() => {
      galleryImg.src = info.src;
      galleryImg.classList.toggle('grayscale-approx', info.grayscale);
      galleryImg.style.opacity = 1;
    }, 150);
    if (colorLabel) colorLabel.textContent = info.label;
  }

  function calcTotal() {
    let total = basePrice[state.size];
    total += storageDelta[state.storage];
    total += connectivityDelta[state.connectivity];
    total += pencilPrice[state.pencil];
    total += keyboardPrice[state.keyboard];
    total += applecarePrice[state.applecare];
    return total;
  }

  function updatePrice() {
    const total = calcTotal();
    if (summaryPrice) summaryPrice.textContent = fmt(total);
    if (headerPrice) headerPrice.textContent = 'Từ ' + fmt(basePrice[state.size]);
  }

  /* ---------- Wire up events ---------- */
  sizeCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.size = card.getAttribute('data-value');
      selectCard(sizeCards, state.size);
      updatePrice();
    });
  });

  colorSwatches.forEach((sw) => {
    sw.addEventListener('click', () => {
      state.color = sw.getAttribute('data-value');
      selectCard(colorSwatches, state.color);
      updateGallery();
    });
  });

  storageCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.storage = card.getAttribute('data-value');
      selectCard(storageCards, state.storage);
      updatePrice();
    });
  });

  connCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.connectivity = card.getAttribute('data-value');
      selectCard(connCards, state.connectivity);
      updatePrice();
    });
  });

  pencilCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.pencil = card.getAttribute('data-value');
      selectCard(pencilCards, state.pencil);
      updatePrice();
    });
  });

  keyboardCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.keyboard = card.getAttribute('data-value');
      selectCard(keyboardCards, state.keyboard);
      updatePrice();
    });
  });

  applecareCards.forEach((card) => {
    card.addEventListener('click', () => {
      state.applecare = card.getAttribute('data-value');
      selectCard(applecareCards, state.applecare);
      updatePrice();
    });
  });

  /* ---------- Gallery arrows / dots (cycle through colors) ---------- */
  const colorOrder = ['blue', 'purple', 'starlight', 'spacegray'];
  const prevBtn = document.querySelector('.gallery-arrow.prev');
  const nextBtn = document.querySelector('.gallery-arrow.next');
  const dots = document.querySelectorAll('.gallery-dots .dot');

  function goToColor(index) {
    const c = colorOrder[index];
    state.color = c;
    selectCard(colorSwatches, c);
    updateGallery();
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    const idx = (colorOrder.indexOf(state.color) - 1 + colorOrder.length) % colorOrder.length;
    goToColor(idx);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const idx = (colorOrder.indexOf(state.color) + 1) % colorOrder.length;
    goToColor(idx);
  });
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToColor(i)));

  /* ---------- Add to bag ---------- */
  const addBagBtn = document.getElementById('addToBagBtn');
  if (addBagBtn) {
    addBagBtn.addEventListener('click', () => {
      addBagBtn.textContent = 'Đã thêm vào giỏ hàng ✓';
      setTimeout(() => { addBagBtn.textContent = 'Thêm vào giỏ hàng'; }, 2000);
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Init ---------- */
  updatePrice();
  updateGallery();
});
