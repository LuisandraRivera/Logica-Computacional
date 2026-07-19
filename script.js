/* ==========================================================================
   CONSISTENCIA LÓGICA — script.js
   JavaScript Vanilla: scroll suave, animaciones, navbar dinámica,
   resaltado de sección activa, botón volver arriba y lazy loading de videos.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. NAVBAR: cambia de estilo al hacer scroll
     ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ------------------------------------------------------------------
     2. MENÚ MÓVIL: abrir / cerrar
     ------------------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú móvil al seleccionar una opción
  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------
     3. SCROLL SUAVE para los enlaces internos (navbar + botón hero)
        (Complementa el "scroll-behavior: smooth" del CSS y ofrece
        control fino sobre el offset de la navbar fija)
     ------------------------------------------------------------------ */
  const NAV_HEIGHT = navbar.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + 1;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });

  /* ------------------------------------------------------------------
     4. ANIMACIONES FADE-IN AL HACER SCROLL (IntersectionObserver)
     ------------------------------------------------------------------ */
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Pequeño escalonado según la posición dentro del contenedor
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* ------------------------------------------------------------------
     5. RESALTADO AUTOMÁTICO DE LA SECCIÓN ACTIVA EN EL MENÚ
     ------------------------------------------------------------------ */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    threshold: 0,
    rootMargin: `-${NAV_HEIGHT + 40}px 0px -60% 0px`
  });

  sections.forEach((section) => {
    if (section.id !== 'top') sectionObserver.observe(section);
  });

  /* ------------------------------------------------------------------
     6. BOTÓN "VOLVER ARRIBA"
     ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------
     7. LAZY LOADING DE IFRAMES DE VIDEO (Google Drive)
        Los iframes inician con src="about:blank" y solo cargan el
        video real (data-src) cuando entran en el viewport.
     ------------------------------------------------------------------ */
  const videoFrames = document.querySelectorAll('.video-item__frame iframe[data-src]');

  const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute('data-src');
        iframeObserver.unobserve(iframe);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '200px 0px 200px 0px'
  });

  videoFrames.forEach((iframe) => iframeObserver.observe(iframe));

});
