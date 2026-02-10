window.addEventListener('DOMContentLoaded', () => {
  /* =========================
     HEADER SCROLL BEHAVIOUR
  ========================= */
  const header = document.querySelector('.header');
  const target = document.querySelector('.projects-section');

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

  /* =========================
     MOBILE SIDEBAR TOGGLE
  ========================= */
  const menuBtn = document.querySelector('.menu-icon');
  const sidebar = document.querySelector('.mobile-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!menuBtn || !sidebar || !overlay || !header) return;

  // Dynamically set header height for sidebar positioning
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
    if(sidebar.classList.contains('active')){
      closeMenu();
    }else openMenu()
  });
  overlay.addEventListener('click', closeMenu);

  // Close sidebar when a link is clicked
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
