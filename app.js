window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.initPageAnimations === 'function') {
    window.initPageAnimations({
      groups: [
        { selector: '.tagline', animation: 'pop' },
        { selector: '.rule', animation: 'fade-up', stagger: 140 },
        { selector: '.container-title', animation: 'fade-right' },
        { selector: '.service-box', animation: 'fade-up', stagger: 120 },
        { selector: '.contact-detail', animation: 'fade-up', stagger: 110 },
        { selector: '.map-embedded iframe', animation: 'zoom' },
        { selector: '.body-bottom-info', animation: 'fade-up', stagger: 140 },
        { selector: '.footer-section', animation: 'fade-up', stagger: 80 }
      ]
    });
  }

  const header = document.querySelector('.header');
  const target = document.querySelector('.body-section');

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
