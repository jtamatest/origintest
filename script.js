document.addEventListener('DOMContentLoaded', () => {
  /* ===== Shrink header on scroll ===== */
  const header = document.getElementById('mainHeader');
  const headerOverlay = header?.querySelector('.overlay');

  // Config
  const maxHeight   = 150; // starting height
  const minHeight   = 75;  // final height
  const scrollRange = 50;  // px of scroll to reach min/solid
  const SWAP_AT     = 20;  // px to switch logo -> text

  let ticking = false;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const clamped = Math.min(Math.max(y, 0), scrollRange);

    // Height: 150 → 75
    const h = maxHeight - (clamped / scrollRange) * (maxHeight - minHeight);
    if (header) header.style.height = h + 'px';

    // Overlay fade: 0 → 1
    const progress = clamped / scrollRange; // 0..1
    if (headerOverlay) headerOverlay.style.opacity = progress.toFixed(3);

    // swap logo and text
    document.body.classList.toggle('swap', y > SWAP_AT);

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
  onScroll(); // initial paint

  /* ===== Mobile drawer (hamburger) ===== */
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.getElementById('menuOverlay');

  function isOpen() {
    return document.body.classList.contains('menu-open');
  }
  function openMenu() {
    document.body.classList.add('menu-open', 'noscroll'); // prevent body scroll
    hamburger?.classList.add('active');
    hamburger?.setAttribute('aria-expanded', 'true');
    menuOverlay?.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    document.body.classList.remove('menu-open', 'noscroll');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
    menuOverlay?.setAttribute('aria-hidden', 'true');
  }

  if (hamburger && menuOverlay) {
    // toggle
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      isOpen() ? closeMenu() : openMenu();
    });

    // click on dark backdrop only
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) closeMenu();
    });

    // close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    // close when clicking any link inside the drawer
    menuOverlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ===== Auto-resume video on tab return ===== */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      const v = document.querySelector('.video-bg');
      v?.play?.().catch(() => {});
    }
  });
});


