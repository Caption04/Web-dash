(() => {
  const STYLE_ID = 'page-animation-styles';

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      [data-animate] {
        opacity: 0;
        transform: translate3d(0, 40px, 0) scale(0.985);
        filter: blur(8px);
        transition:
          opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
          filter 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        transition-delay: var(--animate-delay, 0ms);
        will-change: opacity, transform, filter;
      }

      [data-animate].is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
        filter: blur(0);
      }

      [data-animate="fade-up"] {
        transform: translate3d(0, 42px, 0) scale(0.985);
      }

      [data-animate="fade-left"] {
        transform: translate3d(44px, 0, 0) scale(0.985);
      }

      [data-animate="fade-right"] {
        transform: translate3d(-44px, 0, 0) scale(0.985);
      }

      [data-animate="zoom"] {
        transform: translate3d(0, 28px, 0) scale(0.94);
      }

      [data-animate="pop"] {
        transform: translate3d(0, 18px, 0) scale(0.9);
      }

      [data-page-ready="true"] .page-hero-glow {
        animation: pageHeroGlow 8s ease-in-out infinite alternate;
      }

      @keyframes pageHeroGlow {
        from {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 0.35;
        }

        to {
          transform: translate3d(0, -18px, 0) scale(1.08);
          opacity: 0.65;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [data-animate] {
          opacity: 1;
          transform: none;
          filter: none;
          transition: none;
        }

        [data-page-ready="true"] .page-hero-glow {
          animation: none;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const applyGroup = (selector, animation, stagger) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.animate = animation;
      element.style.setProperty('--animate-delay', `${index * stagger}ms`);
    });
  };

  const observeAnimatedElements = () => {
    const animatedElements = [...document.querySelectorAll('[data-animate]')];

    if (!animatedElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      animatedElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    animatedElements.forEach((element) => observer.observe(element));
  };

  window.initPageAnimations = (config = {}) => {
    injectStyles();

    document.documentElement.setAttribute('data-page-ready', 'false');

    const animationGroups = config.groups || [];
    animationGroups.forEach(({ selector, animation = 'fade-up', stagger = 90 }) => {
      applyGroup(selector, animation, stagger);
    });

    observeAnimatedElements();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-page-ready', 'true');
      });
    });
  };
})();
