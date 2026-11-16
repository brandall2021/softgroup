# SoftGroup Premium Branding Upgrade Design

**Intent and why**

Reforzar la presencia de marca de SoftGroup en la home: el logo debe verse más grande, más protagonista y con mejor resaltamiento; los íconos deben sentirse más tecnológicos, detallados y gráficos, manteniendo el tono corporativo premium del sitio.

**Goals**

- Hacer que el logo en `Navbar` y `Footer` gane jerarquía visual sin romper el layout.
- Elevar los íconos principales hacia un look más “duotono / badge tech” con gradientes, capas y profundidad.
- Mantener consistencia con la paleta actual (`brand`, `cyan`, `violet`, `emerald`, `amber`, `rose`) y con las superficies claras/oscuras del sitio.
- Reutilizar el mismo lenguaje visual en las secciones clave para que el upgrade se lea como un sistema, no como retoques aislados.

**Non-goals**

- No rediseñar el logo base ni reemplazar los assets aprobados.
- No cambiar la arquitectura de contenido ni el copy principal.
- No convertir el sitio en una estética gaming, neon agresiva o recargada.

**Anti-goals**

- Un header donde el logo tape navegación o CTA.
- Íconos “bonitos” pero inconsistentes entre secciones.
- Sombras o glow exagerados que resten legibilidad o profesionalismo.

**Constraints**

- Conservar el logo aprobado en `public/logo-nav.png` y sus variantes existentes.
- Mantener compatibilidad con `Next.js 16`, `React 19`, `Tailwind 4` y `framer-motion`.
- Respetar `prefers-reduced-motion` y no reintroducir hydration mismatch.
- Mantener build limpio con `npm run build`.
- Mantener el estilo dark-first premium ya establecido en la web.

## Approaches

### 1. Ajustes locales por componente

Agrandar el logo y retocar cada ícono directamente dentro de cada sección.

**Tradeoff:** rápido al inicio, pero propenso a inconsistencias y duplicación visual.

### 2. Sistema compartido de branding premium **(elegido)**

Crear primitivas reutilizables para logo e íconos premium, y aplicarlas a navbar, footer y secciones clave.

**Tradeoff:** requiere una capa de composición extra, pero mantiene consistencia y facilita futuros ajustes.

### 3. Reemplazo completo del lenguaje visual de íconos

Rediseñar todos los íconos y contenedores como ilustraciones complejas.

**Tradeoff:** mayor impacto visual, pero demasiado invasivo para el alcance pedido y con más riesgo de ruido.

## Chosen approach

Se elige el **sistema compartido de branding premium**: un componente de logo con énfasis contextual y un componente de badge de ícono premium, reutilizados en navbar, footer y secciones principales (`Services`, `AIAgent`, `Process`, `Stats`, y enlaces sociales del footer si aporta consistencia).

## What is left to the builder

- Definir tamaños exactos por breakpoint para que el logo gane presencia sin romper el header.
- Elegir las combinaciones finales de glow/ring/overlay que se lean premium pero sobrias.
- Aplicar el sistema visual donde aporte más valor sin forzar cambios en secciones secundarias.
- Verificar visualmente desktop/mobile/dark/reduced-motion antes de cerrar.
