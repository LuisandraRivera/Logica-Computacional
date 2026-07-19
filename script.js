/* ============================================================
   CONSISTENCIA LÓGICA — SCRIPT PRINCIPAL
   - Navbar dinámica (cambia al hacer scroll)
   - Menú móvil
   - Scroll suave para enlaces internos
   - Resaltado de la sección activa en el menú
   - Animaciones fade-in al aparecer en pantalla (IntersectionObserver)
   - Botón flotante "volver arriba"
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Referencias generales ---------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main .section, .hero");
  const backToTop = document.getElementById("backToTop");
  const fadeElements = document.querySelectorAll(".fade-in");

  /* ============================================================
     1. NAVBAR: cambia de estilo al hacer scroll
     ============================================================ */
  function handleNavbarScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });

  /* ============================================================
     2. MENÚ MÓVIL (toggle)
     ============================================================ */
  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("is-open");
  });

  // Cierra el menú móvil al seleccionar una opción
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("is-open");
    });
  });

  /* ============================================================
     3. SCROLL SUAVE
     (Se apoya en `scroll-behavior: smooth` del CSS; este listener
     asegura compatibilidad y evita saltos bruscos en navegadores
     que no respeten el CSS)
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // compensa la navbar fija
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ============================================================
     4. RESALTADO DE LA SECCIÓN ACTIVA EN EL MENÚ
     ============================================================ */
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    if (section.id) sectionObserver.observe(section);
  });

  /* ============================================================
     5. ANIMACIONES FADE-IN AL HACER SCROLL
     ============================================================ */
  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* ============================================================
     6. BOTÓN FLOTANTE "VOLVER ARRIBA"
     ============================================================ */
  function handleBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }
  handleBackToTop();
  window.addEventListener("scroll", handleBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============================================================
     7. CONVERSIÓN AUTOMÁTICA DE ENLACES DE GOOGLE DRIVE
     Esta función queda disponible para convertir dinámicamente
     cualquier enlace de Google Drive con formato:
       https://drive.google.com/file/d/ID/view...
     al formato embebido:
       https://drive.google.com/file/d/ID/preview
     Todos los iframes del HTML ya usan el formato /preview,
     pero esta utilidad permite generar el enlace si se agregan
     videos nuevos dinámicamente en el futuro.
     ============================================================ */
  function convertirEnlaceDrive(url) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return url;
    const id = match[1];
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  // Se expone globalmente por si se necesita reutilizar.
  window.convertirEnlaceDrive = convertirEnlaceDrive;

});
