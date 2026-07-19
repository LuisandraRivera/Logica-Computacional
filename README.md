# Consistencia Lógica en Sistemas Domóticos e IoT

Página web de exposición universitaria sobre la **consistencia lógica aplicada
a la domótica e Internet de las Cosas (IoT)**, construida con HTML5, CSS3 y
JavaScript puro (sin frameworks).

## Estructura del proyecto

```
/
│── index.html   → Estructura y contenido de la página
│── style.css    → Estilos (diseño tipo blog moderno: Medium / Notion / Apple)
│── script.js    → Interactividad (scroll, animaciones, menú, videos)
│── README.md    → Este archivo
```

## Cómo usarla

1. Descarga los 4 archivos y guárdalos en la misma carpeta.
2. Abre `index.html` directamente en cualquier navegador moderno
   (Chrome, Edge, Firefox, Safari). No requiere servidor ni instalación.

## Contenido

- **Introducción, Concepto, Tipos y Características** de la consistencia lógica.
- **Caso real** de inconsistencia en un hogar inteligente.
- **Aplicación** de la lógica proposicional a las reglas de los dispositivos.
- **Falla lógica** explicada con la fórmula `P ∧ ¬P`.
- **Solución** propuesta: un Orquestador Inteligente basado en IA, con diagrama
  hecho en HTML/CSS puro.
- **Primera y Segunda Parte**: videos de la exposición del grupo, embebidos
  directamente desde Google Drive.

## Videos de Google Drive

Todos los enlaces de Google Drive se convirtieron automáticamente al formato
embebido para que se reproduzcan dentro de la página mediante `<iframe>`:

```
https://drive.google.com/file/d/ID_DEL_ARCHIVO/preview
```

En `script.js` se incluye la función `convertirEnlaceDrive(url)`, disponible
por si en el futuro se agregan nuevos videos y se necesita convertir su
enlace automáticamente.

> **Importante:** cada archivo de Google Drive debe tener el acceso
> configurado como "Cualquier persona con el enlace puede ver" para que el
> video se reproduzca correctamente dentro del `iframe`.

## Características técnicas

- 100% responsive (escritorio, tablet y móvil).
- Navbar fija con cambio de estilo al hacer scroll y resaltado automático
  de la sección activa.
- Animaciones de aparición (fade-in) al hacer scroll mediante
  `IntersectionObserver`.
- Botón flotante para volver arriba.
- Carga diferida (`loading="lazy"`) de los `iframe` de video.
- Paleta de colores restringida a blanco, negro, gris claro y azul suave.
- Tipografías Poppins (encabezados) e Inter (texto), vía Google Fonts.
- Iconografía con Font Awesome 6.

## Autores de los videos (Primera Parte)

- Introducción, Concepto y Tipos — Carlos Vélez
- Características — Ezequiel Romero
- Descripción del Caso — Juan Esteves
- Dónde se Aplican los Conceptos Lógicos — Steven Boada
- Falla Lógica — Mauricio
- Solución — Luisandra Rivera
