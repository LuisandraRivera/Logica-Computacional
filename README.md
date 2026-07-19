# Consistencia Lógica en Sistemas Domóticos

Página web tipo blog moderno para una exposición universitaria sobre **consistencia lógica aplicada a la domótica e Internet de las Cosas (IoT)**.

Construida únicamente con **HTML5, CSS3 y JavaScript Vanilla** — sin frameworks ni librerías de UI (no Bootstrap, no Tailwind, no React/Vue/Angular).

## Estructura del proyecto

```
/
│── index.html   → Estructura y contenido de todas las secciones
│── style.css    → Estilos, tokens de diseño, animaciones y responsive
│── script.js    → Interactividad (scroll, navbar, animaciones, videos)
│── README.md    → Este archivo
```

## Cómo verla

No requiere instalación ni servidor. Basta con abrir `index.html` en cualquier navegador moderno.

Si prefieres servirla localmente (recomendado para que los iframes de Google Drive carguen sin restricciones del navegador):

```bash
# Con Python
python3 -m http.server 8000

# Luego visita:
http://localhost:8000
```

## Secciones incluidas

1. **Hero** — Título, subtítulo y botón de acceso a la presentación.
2. **Introducción**
3. **Concepto** — con la fórmula de no contradicción (¬(P ∧ ¬P)).
4. **Tipos** — Estática, Dinámica, de Dispositivos y Temporal.
5. **Características** — lista de beneficios.
6. **Caso Real** — ilustración del conflicto aire acondicionado / ventana.
7. **Aplicación** — cómo cada regla es una proposición lógica.
8. **Falla Lógica** — explicación del estado inconsistente (P ∧ ¬P).
9. **Solución** — Orquestador Inteligente + diagrama Sensores → Orquestador IA → Dispositivos + **simulador interactivo** que ejecuta en el navegador la lógica de los pseudocódigos PSeInt "Antes" y "Después" del orquestador.
10. **Primera Parte** — videos horizontales embebidos vía iframe.
11. **Segunda Parte** — videos horizontales embebidos vía iframe.
12. **Footer**

## Diseño

- Paleta: blanco, negro, gris claro y azul suave (`#4f7cff`) como único acento de color.
- Tipografía: **Poppins** (encabezados) + **Inter** (cuerpo), con **JetBrains Mono** para los elementos lógicos (P, ¬P, etiquetas).
- Iconografía: Font Awesome 6 (vía CDN).
- Estética inspirada en Medium, Notion, Apple y GitHub Pages: mucho espacio en blanco, tarjetas redondeadas, sombras suaves, sin colores fuertes.

## Funcionalidades JavaScript

- Scroll suave al navegar por el menú.
- Navbar fija que cambia de apariencia (blur + sombra) al hacer scroll.
- Resaltado automático del enlace activo del menú según la sección visible.
- Animaciones "fade in" al hacer scroll mediante `IntersectionObserver`.
- Menú responsive (hamburguesa) para móviles.
- Botón flotante "volver arriba".
- **Lazy loading** de los iframes de video: los videos de Google Drive solo cargan su `src` real cuando la sección entra en el viewport, mejorando el rendimiento inicial de la página.

## Simulador del Orquestador (pseudocódigo ejecutable)

Dentro de la sección **Solución** se incluye un simulador con dos pestañas, "Antes" y "Después", que traduce a JavaScript la lógica exacta de los archivos PSeInt del proyecto:

- **Antes** (`OrquestadorLoT_-_casa_inteligente_antes_.psc`): permite ajustar temperatura, hora y el estado de ventanas, aire acondicionado, cerraduras y alarma. Reproduce el comportamiento original: el sistema solo *avisa* de las contradicciones, pero nunca las corrige (incluso desactiva la alarma automáticamente al poner las cerraduras).
- **Después** (`OrquestadorLoT_-_casa_inteligente_despues_.psc`): permite elegir uno de los 5 escenarios de sensores definidos en el pseudocódigo original, además de la preferencia de ventilación y el modo de seguridad. Reproduce las 4 fases del orquestador (recepción de datos, aprendizaje, evaluación de reglas y reporte final), corrigiendo cada inconsistencia y mostrando el resumen de casos consistentes/inconsistentes.

La salida de ambas simulaciones se muestra en una consola estilizada (`.terminal`) que reproduce, línea por línea, los mensajes `Escribir` del pseudocódigo original. Toda la lógica vive en `script.js`, sección **8. SIMULADOR DEL ORQUESTADOR**, y no depende de librerías externas ni de ejecutar PSeInt: es una reimplementación fiel en JavaScript vanilla.

## Videos de Google Drive

Todos los enlaces compartidos fueron convertidos automáticamente al formato de reproducción embebida:

```
https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview
```

Este formato permite que los videos se reproduzcan directamente dentro de un `<iframe>`, en formato horizontal, sin necesidad de descargar el archivo.

## Notas para mantenimiento

- Los tokens de diseño (colores, radios, sombras, tipografías) están centralizados en `:root` al inicio de `style.css` — cualquier ajuste de marca puede hacerse desde ahí.
- Para agregar un nuevo video, duplica un bloque `.video-item` en `index.html` y coloca el enlace de Drive ya convertido en el atributo `data-src` del `<iframe>`.
- Para agregar una nueva sección al menú, añade el enlace en `.navbar__nav` y una sección con el `id` correspondiente en `<main>`; el resaltado activo y el scroll suave funcionan automáticamente.
