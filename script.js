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

  /* ------------------------------------------------------------------
     8. SIMULADOR DEL ORQUESTADOR
        Traducción a JavaScript de los pseudocódigos PSeInt:
        - OrquestadorIoT_Antes.psc (sistema sin orquestador)
        - OrquestadorIoT.psc       (sistema con orquestador IA)
     ------------------------------------------------------------------ */
  const simulator = document.getElementById('simulador');
  if (simulator) {

    /* --- Cambio de pestañas Antes / Después --- */
    const tabs = simulator.querySelectorAll('.simulator__tab');
    const panels = simulator.querySelectorAll('.simulator__panel');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        panels.forEach((p) => p.classList.remove('is-active'));

        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        simulator.querySelector(`.simulator__panel[data-panel="${tab.dataset.tab}"]`).classList.add('is-active');
      });
    });

    /* --- Interruptores Verdadero / Falso --- */
    const toggles = simulator.querySelectorAll('.toggle');
    toggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = btn.dataset.value === 'true';
        const next = !current;
        btn.dataset.value = String(next);
        btn.setAttribute('aria-pressed', String(next));
        btn.textContent = next ? 'Verdadero' : 'Falso';
      });
    });

    const getToggleValue = (targetId) => {
      const btn = simulator.querySelector(`.toggle[data-target="${targetId}"]`);
      return btn.dataset.value === 'true';
    };

    const bool = (v) => (v ? 'Verdadero' : 'Falso');

    /* Escribe las líneas en la "terminal" con clases de color según el tipo */
    const printLines = (outputEl, lines) => {
      const body = outputEl.querySelector('.terminal__body');
      body.innerHTML = lines
        .map((line) => `<span class="line--${line.type || 'plain'}">${line.text}</span>`)
        .join('\n');
    };

    /* ================= LÓGICA "ANTES" (sin orquestador) ================= */
    const runAntesBtn = document.getElementById('runAntes');
    const outputAntes = document.getElementById('outputAntes');

    runAntesBtn.addEventListener('click', () => {
      const temperaturaActual = parseFloat(document.getElementById('antesTemp').value) || 0;
      const horaDelSistema = parseInt(document.getElementById('antesHora').value, 10) || 0;
      let estadoVentanas = getToggleValue('antesVentanas');
      let estadoAireAcondicionado = getToggleValue('antesAire');
      const estadoCerraduras = getToggleValue('antesCerraduras');
      let estadoAlarmas = getToggleValue('antesAlarma');

      const lines = [];
      lines.push({ type: 'title', text: 'Ejecutando OrquestadorIoT_Antes.psc…' });
      lines.push({ type: 'muted', text: '' });

      // Inconsistencia 1: temperatura alta sin ninguna ventilación activa
      if (temperaturaActual > 25 && estadoVentanas === false && estadoAireAcondicionado === false) {
        lines.push({ type: 'warn', text: 'Aviso: temperatura alta sin ventilación activa. El sistema no toma ninguna acción al respecto.' });
      }

      // Inconsistencia 2: alarma activa sin que el sistema verifique cerraduras
      if (estadoAlarmas === true && estadoCerraduras === false) {
        lines.push({ type: 'warn', text: 'Aviso: alarma activa con cerraduras sin poner. El sistema no coloca las cerraduras ni corrige la situación.' });
      }

      // Inconsistencia 3: cerraduras puestas desactivan la alarma automáticamente
      if (estadoCerraduras === true) {
        estadoAlarmas = false;
        lines.push({ type: 'warn', text: 'Cerraduras puestas. Alarma desactivada automáticamente (lógica contraria a la seguridad).' });
      }

      lines.push({ type: 'muted', text: '-------------------------------------------' });
      lines.push({ type: 'title', text: 'Estado final de los dispositivos:' });
      lines.push({ type: 'plain', text: `Temperatura: ${temperaturaActual}` });
      lines.push({ type: 'plain', text: `Hora del sistema: ${horaDelSistema}` });
      lines.push({ type: 'plain', text: `Ventanas abiertas: ${bool(estadoVentanas)}` });
      lines.push({ type: 'plain', text: `Aire acondicionado encendido: ${bool(estadoAireAcondicionado)}` });
      lines.push({ type: 'plain', text: `Cerraduras puestas: ${bool(estadoCerraduras)}` });
      lines.push({ type: 'plain', text: `Alarma activa: ${bool(estadoAlarmas)}` });
      lines.push({ type: 'muted', text: '-------------------------------------------' });

      const huboInconsistencia = lines.some((l) => l.type === 'warn');
      lines.push({
        type: huboInconsistencia ? 'warn' : 'fix',
        text: huboInconsistencia
          ? 'Resultado: el sistema detectó contradicciones, pero ninguna fue corregida.'
          : 'Resultado: no se detectaron contradicciones en este escenario.'
      });

      printLines(outputAntes, lines);
    });

    /* ================= LÓGICA "DESPUÉS" (con orquestador IA) ================= */

    // Los 5 escenarios de sensores definidos en el pseudocódigo original
    const escenarios = {
      1: { hora: 14, temperatura: 30, ventanas: true, aire: true, cerraduras: true, alarma: false },
      2: { hora: 22, temperatura: 20, ventanas: false, aire: false, cerraduras: false, alarma: true },
      3: { hora: 8, temperatura: 22, ventanas: true, aire: false, cerraduras: false, alarma: false },
      4: { hora: 15, temperatura: 28, ventanas: false, aire: false, cerraduras: true, alarma: false },
      5: { hora: 23, temperatura: 19, ventanas: false, aire: false, cerraduras: true, alarma: true }
    };

    const runDespuesBtn = document.getElementById('runDespues');
    const outputDespues = document.getElementById('outputDespues');

    runDespuesBtn.addEventListener('click', () => {
      const indiceReporte = parseInt(document.getElementById('despuesEscenario').value, 10);
      let preferenciaUsuario = document.getElementById('despuesPreferencia').value;
      const modoSeguridad = document.getElementById('despuesModo').value;

      const escenario = escenarios[indiceReporte];
      const temperaturaActual = escenario.temperatura;
      const horaDelSistema = escenario.hora;
      let estadoVentanas = escenario.ventanas;
      let estadoAireAcondicionado = escenario.aire;
      let estadoCerraduras = escenario.cerraduras;
      let estadoAlarmas = escenario.alarma;

      const lines = [];
      let contadorConsistencias = 0;
      let contadorInconsistencias = 0;
      let decisionTomada = 'Sin novedades';

      lines.push({ type: 'title', text: 'Ejecutando OrquestadorIoT.psc…' });
      lines.push({ type: 'plain', text: `Sensor mostrando datos del reporte ${indiceReporte}…` });
      lines.push({ type: 'muted', text: '' });

      // Fase 2: Aprendizaje de rutinas (siempre "aprende" en una nueva sesión)
      lines.push({ type: 'ok', text: 'Fase 2 — Aprendizaje: hora no reconocida en la sesión actual.' });
      lines.push({ type: 'ok', text: `Por defecto, el orquestador prioriza: ${preferenciaUsuario === 'VentilacionNatural' ? 'ventilación natural (ventanas)' : 'aire acondicionado'}.` });

      // Fase 3: Evaluación de reglas lógicas

      // Caso 1: Aire acondicionado y ventanas abiertas a la vez
      if (estadoAireAcondicionado === true && estadoVentanas === true) {
        contadorInconsistencias++;
        if (preferenciaUsuario === 'VentilacionNatural') {
          estadoAireAcondicionado = false;
          decisionTomada = 'Inconsistencia: aire acondicionado y ventanas abiertas a la vez. Aire acondicionado apagado, las ventanas se mantienen abiertas.';
        } else {
          estadoVentanas = false;
          decisionTomada = 'Inconsistencia: aire acondicionado y ventanas abiertas a la vez. Ventanas cerradas, el aire acondicionado se mantiene encendido.';
        }
        lines.push({ type: 'fix', text: decisionTomada });
      } else {
        contadorConsistencias++;
        if (estadoAireAcondicionado === true && estadoVentanas === false) {
          decisionTomada = 'Consistente: aire acondicionado encendido con ventanas cerradas.';
        } else if (estadoAireAcondicionado === false && estadoVentanas === true) {
          decisionTomada = 'Consistente: ventanas abiertas con aire acondicionado apagado.';
        } else {
          decisionTomada = 'Consistente: aire acondicionado apagado y ventanas cerradas, casa sin ventilación activa.';
        }
        lines.push({ type: 'ok', text: decisionTomada });
      }

      // Caso 2: Temperatura y ventilación
      if (temperaturaActual > 25) {
        if (estadoVentanas === false && estadoAireAcondicionado === false) {
          contadorInconsistencias++;
          if (preferenciaUsuario === 'VentilacionNatural') {
            estadoVentanas = true;
            decisionTomada = 'Inconsistencia: temperatura alta sin ventilación. Ventanas abiertas por temperatura alta.';
          } else {
            estadoAireAcondicionado = true;
            decisionTomada = 'Inconsistencia: temperatura alta sin ventilación. Aire acondicionado encendido por temperatura alta.';
          }
          lines.push({ type: 'fix', text: decisionTomada });
        } else if (estadoVentanas === true && estadoAireAcondicionado === false) {
          contadorConsistencias++;
          decisionTomada = 'Consistente: temperatura alta, las ventanas están abiertas para ventilar.';
          lines.push({ type: 'ok', text: decisionTomada });
        } else if (estadoVentanas === false && estadoAireAcondicionado === true) {
          contadorConsistencias++;
          decisionTomada = 'Consistente: temperatura alta, el aire acondicionado ya está encendido.';
          lines.push({ type: 'ok', text: decisionTomada });
        } else {
          contadorInconsistencias++;
          estadoVentanas = false;
          decisionTomada = 'Inconsistencia: temperatura alta con aire acondicionado y ventanas abiertas a la vez. Ventanas cerrándose para optimizar el aire.';
          lines.push({ type: 'fix', text: decisionTomada });
        }
      } else if (estadoVentanas === false && estadoAireAcondicionado === false) {
        contadorConsistencias++;
        decisionTomada = 'Consistente: temperatura normal, sin necesidad de ventilación.';
        lines.push({ type: 'ok', text: decisionTomada });
      } else {
        contadorConsistencias++;
        decisionTomada = 'Consistente: temperatura normal, ventilación activa por preferencia del usuario.';
        lines.push({ type: 'ok', text: decisionTomada });
      }

      // Caso 3: Alarma activa con cerraduras sin poner
      if (estadoAlarmas === true && estadoCerraduras === false) {
        contadorInconsistencias++;
        estadoCerraduras = true;
        estadoVentanas = false;
        decisionTomada = 'Inconsistencia: alarma activa con cerraduras sin colocar. Cerraduras colocadas y ventanas cerradas como medida de seguridad.';
        lines.push({ type: 'fix', text: decisionTomada });
      }

      // Caso 4: Alarma inactiva y cerraduras sin poner
      if (estadoAlarmas === false && estadoCerraduras === false) {
        contadorInconsistencias++;
        if (modoSeguridad === 'SeguridadAlta') {
          estadoCerraduras = true;
          decisionTomada = 'Inconsistencia: cerraduras sin colocar sin alarma activa. Cerraduras puestas por seguridad (modo seguridad alta).';
        } else {
          decisionTomada = 'Inconsistencia: cerraduras sin colocar sin alarma activa. Se mantienen sin poner por preferencia de modo balanceado; se recomienda revisar.';
        }
        lines.push({ type: 'fix', text: decisionTomada });
      }

      // Caso 5: Alarma activa con cerraduras puestas
      if (estadoAlarmas === true && estadoCerraduras === true) {
        contadorConsistencias++;
        decisionTomada = 'Consistente: alarma activa y cerraduras puestas. Casa segura.';
        lines.push({ type: 'ok', text: decisionTomada });
      }

      // Fase 4: Registro y salida
      lines.push({ type: 'muted', text: '' });
      lines.push({ type: 'muted', text: '-------------------------------------------' });
      lines.push({ type: 'title', text: 'Reporte del Orquestador IoT' });
      lines.push({ type: 'muted', text: '-------------------------------------------' });
      lines.push({ type: 'plain', text: `Temperatura actual: ${temperaturaActual}` });
      lines.push({ type: 'plain', text: `Ventanas abiertas: ${bool(estadoVentanas)}` });
      lines.push({ type: 'plain', text: `Aire acondicionado encendido: ${bool(estadoAireAcondicionado)}` });
      lines.push({ type: 'plain', text: `Cerraduras puestas: ${bool(estadoCerraduras)}` });
      lines.push({ type: 'plain', text: `Alarma activa: ${bool(estadoAlarmas)}` });
      lines.push({ type: 'plain', text: `Hora del sistema: ${horaDelSistema}` });
      lines.push({ type: 'muted', text: '-------------------------------------------' });

      if (contadorInconsistencias > 0) {
        lines.push({ type: 'fix', text: 'Inconsistencias detectadas y corregidas.' });
        lines.push({ type: 'fix', text: `Última decisión tomada: ${decisionTomada}` });
      } else {
        lines.push({ type: 'ok', text: 'No se detectaron inconsistencias. Estado de la casa: consistente.' });
      }

      lines.push({ type: 'muted', text: '-------------------------------------------' });
      lines.push({ type: 'title', text: 'Resumen del análisis:' });
      lines.push({ type: 'ok', text: `Casos consistentes: ${contadorConsistencias}` });
      lines.push({ type: 'warn', text: `Casos inconsistentes (corregidos): ${contadorInconsistencias}` });

      printLines(outputDespues, lines);
    });
  }

});
