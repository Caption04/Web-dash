window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.initPageAnimations === 'function') {
    window.initPageAnimations({
      groups: [
        { selector: '.about-title', animation: 'pop' },
        { selector: '.about-subtitle', animation: 'fade-up' },
        { selector: '.hero-cta a', animation: 'fade-up', stagger: 120 },
        { selector: '.trust-item', animation: 'fade-up', stagger: 100 },
        { selector: '.container-title', animation: 'fade-right' },
        { selector: '.card', animation: 'fade-up', stagger: 140 },
        { selector: '.service-card', animation: 'fade-up', stagger: 120 },
        { selector: '.step', animation: 'fade-up', stagger: 90 },
        { selector: '.proof-card', animation: 'zoom', stagger: 120 },
        { selector: '.management-card', animation: 'fade-up', stagger: 130 },
        { selector: '.cta-inner', animation: 'zoom' },
        { selector: '.contact-detail', animation: 'fade-up', stagger: 90 },
        { selector: '.footer-section', animation: 'fade-up', stagger: 80 }
      ]
    });
  }

  const header = document.querySelector('.header');
  const target = document.querySelector('.trust-strip');

  if (header && target) {
    const updateHeader = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      const targetTop = target.getBoundingClientRect().top;

      if (headerBottom >= targetTop) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
  }

  const menuBtn = document.querySelector('.menu-icon');
  const sidebar = document.querySelector('.mobile-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!menuBtn || !sidebar || !overlay || !header) {
    return;
  }

  const setHeaderHeight = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.offsetHeight}px`
    );
  };

  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  const openMenu = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
  };

  menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
});
