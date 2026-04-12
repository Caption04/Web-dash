window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.initPageAnimations === 'function') {
    window.initPageAnimations({
      groups: [
        { selector: '.projects-hero-inner h1', animation: 'pop' },
        { selector: '.projects-hero-inner p', animation: 'fade-up' },
        { selector: '.project-card', animation: 'fade-up', stagger: 150 },
        { selector: '.project-card .project-image', animation: 'zoom', stagger: 120 },
        { selector: '.project-card .project-content > *', animation: 'fade-up', stagger: 90 },
        { selector: '.projects-cta > *', animation: 'fade-up', stagger: 110 },
        { selector: '.footer-section', animation: 'fade-up', stagger: 80 }
      ]
    });
  }

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

  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll('img');

    if (images.length < 2) {
      return;
    }

    let index = 0;
    let intervalId;

    const startCarousel = () => {
      stopCarousel();
      intervalId = window.setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
      }, 2500);
    };

    const stopCarousel = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };

    startCarousel();

    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
  });

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
