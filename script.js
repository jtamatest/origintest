document.addEventListener('DOMContentLoaded', () => {
  const header  = document.getElementById('mainHeader');
  const overlay = header.querySelector('.overlay');

  // Config
  const maxHeight   = 150;  // starting height
  const minHeight   = 75;  // final height
  const scrollRange = 50;   // px of scroll to reach min/solid
  const SWAP_AT     = 20;   // px to switch logo -> text

  let ticking = false;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const clamped = Math.min(Math.max(y, 0), scrollRange);

    // Height: 200 → 100
    const h = maxHeight - (clamped / scrollRange) * (maxHeight - minHeight);
    header.style.height = h + 'px';

    // Overlay fade: 0 → 1
    const progress = clamped / scrollRange; // 0..1
    overlay.style.opacity = progress.toFixed(3);

    // ★ NEW: swap logo and text
    if (y > SWAP_AT) {
      document.body.classList.add('swap');
    } else {
      document.body.classList.remove('swap');
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  onScroll(); // initial paint
});


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.getElementById('menuOverlay');

  if (!hamburger || !overlay) return;

  function closeMenu() {
    document.body.classList.remove('menu-open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const opening = !document.body.classList.contains('menu-open');

    hamburger.classList.toggle('active', opening);
    document.body.classList.toggle('menu-open', opening);
    hamburger.setAttribute('aria-expanded', String(opening));
    overlay.setAttribute('aria-hidden', String(!opening));
  });

  // Click on the overlay closes it
  overlay.addEventListener('click', closeMenu);

  // ESC key closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
});


document.addEventListener('visibilitychange' , ()=> {
if(!document.hidden) {
    const v = document.querySelector ('.video-bg');
    v && v.play().catch (()=>{});
  }
});
