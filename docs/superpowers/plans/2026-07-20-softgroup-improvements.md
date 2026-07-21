# SoftGroup - Plan de Mejoras

> **For agentic workers:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Mejorar la calidad, accesibilidad, rendimiento y diseño del proyecto SoftGroup

**Architecture:** Refactorizar componentes monolíticos en módulos más pequeños, agregar accesibilidad completa, optimizar animaciones, y mejorar la seguridad del formulario.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12

---

## Global Constraints

- Next.js 16.x (verificar docs en `node_modules/next/dist/docs/`)
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x
- Framer Motion 12.x
- No agregar dependencias nuevas sin justificación

---

## Hallazgos Críticos

### 1. Accesibilidad (CRÍTICO)
- Solo 2 de 15 componentes usan `useReducedMotion()`
- Falta `aria-label` en botones interactivos
- Sin manejo de `prefers-reduced-motion` en la mayoría de animaciones
- Formulario sin `aria-invalid` consistente

### 2. Seguridad (CRÍTICO)
- Formulario sin protección CSRF
- Sin rate limiting en envíos
- Inputs sin sanitización explícita
- Datos de contacto hardcodeados (email, teléfono)

### 3. Performance (ALTO)
- Framer Motion `x`/`y` props no hardware-accelerated
- Animaciones usando `ease` en lugar de curvas custom
- Sin lazy loading de imágenes
- Bundle grande por Framer Motion

### 4. Arquitectura (MEDIO)
- Componentes grandes: Contact.tsx (430+ líneas), BudgetCalculator.tsx (400+ líneas)
- Datos hardcodeados en componentes en lugar de CMS/API
- Sin Error Boundaries
- Sin loading states/skeleton loaders

### 5. Animaciones (MEDIO)
- Falta `transform-origin` en popovers/modals
- Algunas animaciones usan `scale(0)` en lugar de `scale(0.95)`
- Duraciones > 300ms en elementos UI
- Sin stagger en todas las listas

---

## Plan de Mejoras

### Fase 1: Accesibilidad y Core (Prioridad CRÍTICA)

#### Task 1: Agregar reduced motion a todos los componentes

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Stats.tsx`
- Modify: `src/components/Process.tsx`
- Modify: `src/components/TechStack.tsx`
- Modify: `src/components/Testimonials.tsx`
- Modify: `src/components/Blog.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/ChatWidget.tsx`

**Steps:**
1. Importar `useReducedMotion` de Framer Motion
2. Crear variable `prefersReduced` en cada componente
3. Conditional animations: `initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}`
4. Desactivar marquee en TechStack cuando reduced motion
5. Desactivar canvas animation en Hero cuando reduced motion

#### Task 2: Agregar aria-labels a todos los botones

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Services.tsx`
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/ChatWidget.tsx`

**Steps:**
1. Agregar `aria-label` a todos los `<button>` y `<a>` interactivos
2. Agregar `role="button"` donde sea necesario
3. Agregar `aria-expanded` al menú móvil
4. Agregar `aria-current="page"` al link activo

#### Task 3: Mejorar formulario de contacto

**Files:**
- Modify: `src/components/Contact.tsx`

**Steps:**
1. Agregar CSRF token (generar con crypto.randomUUID)
2. Agregar honeypot field (campo oculto para bots)
3. Agregar rate limiting (máximo 3 envíos por minuto)
4. Agregar sanitización de inputs con DOMPurify
5. Agregar `aria-live="polite"` para mensajes de error
6. Agregar `role="alert"` a mensajes de error

---

### Fase 2: Performance y Animaciones (Prioridad ALTA)

#### Task 4: Optimizar animaciones Framer Motion

**Files:**
- Modify: `src/components/AIAgent.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Stats.tsx`

**Steps:**
1. Reemplazar `x`/`y` props con `transform: "translateX()"` para hardware acceleration
2. Reemplazar `ease: "easeIn"` con `ease: [0.23, 1, 0.32, 1]`
3. Reducir duraciones > 300ms a 250ms máximo
4. Agregar `will-change: transform` a elementos animados
5. Usar CSS animations para marquee en TechStack

#### Task 5: Agregar Error Boundaries

**Files:**
- Create: `src/components/ErrorBoundary.tsx`
- Modify: `src/app/page.tsx`

**Steps:**
1. Crear componente ErrorBoundary con fallback UI
2. Wrappar secciones principales con ErrorBoundary
3. Agregar logging de errores
4. Mostrar UI de fallback amigable

#### Task 6: Optimizar bundle size

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `next.config.ts`

**Steps:**
1. Cambiar `ssr: true` a `ssr: false` en dynamic imports
2. Agregar `loading` states con skeleton loaders
3. Configurar `transpilePackages` si es necesario
4. Analizar bundle con `@next/bundle-analyzer`

---

### Fase 3: Arquitectura y Código (Prioridad MEDIO)

#### Task 7: Refactorizar componentes grandes

**Files:**
- Split: `src/components/Contact.tsx` → `ContactForm.tsx`, `ContactInfo.tsx`
- Split: `src/components/BudgetCalculator.tsx` → `BudgetForm.tsx`, `BudgetSummary.tsx`
- Split: `src/components/ChatWidget.tsx` → `ChatWindow.tsx`, `ChatMessage.tsx`

**Steps:**
1. Extraer subcomponentes con responsabilidad única
2. Mover interfaces a archivo compartido `src/types/`
3. Crear hooks personalizados: `useFormValidation`, `useChat`
4. Mantener props interfaces explícitas

#### Task 8: Extraer datos a config

**Files:**
- Create: `src/config/services.ts`
- Create: `src/config/stats.ts`
- Create: `src/config/testimonials.ts`
- Create: `src/config/process.ts`

**Steps:**
1. Mover arrays de datos a archivos de configuración
2. Exportar tipos junto con datos
3. Facilitar futura migración a CMS/API
4. Mantener datos tipados

#### Task 9: Mejorar SEO y Meta tags

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `public/robots.txt`
- Create: `public/og-image.png`

**Steps:**
1. Agregar meta description por página
2. Agregar Open Graph image
3. Configurar robots.txt
4. Agregar canonical URLs
5. Mejorar Schema.org (agregar más tipos)

---

### Fase 4: UX y Design (Prioridad BAJA)

#### Task 10: Agregar loading states

**Files:**
- Create: `src/components/ui/Skeleton.tsx`
- Modify: `src/app/page.tsx`

**Steps:**
1. Crear componente Skeleton reutilizable
2. Agregar skeleton para cada sección
3. Mejorar percepción de carga
4. Agregar transiciones suaves entre estados

#### Task 11: Mejorar hover states

**Files:**
- Modify: `src/components/Services.tsx`
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/components/Blog.tsx`

**Steps:**
1. Agregar `@media (hover: hover) and (pointer: fine)`
2. Reducir animaciones en hover (solo transform/opacity)
3. Agregar `transition-all duration-200` consistente
4. Probar en dispositivos touch

#### Task 12: Testing y verificación

**Files:**
- Create: `tests/accessibility.spec.ts`
- Create: `tests/performance.spec.ts`

**Steps:**
1. Agregar tests de accesibilidad con axe-core
2. Agregar tests de performance con Lighthouse
3. Verificar contraste de colores WCAG AA
4. Probar navegación por teclado
5. Verificar reduced motion

---

## Verificación

Después de implementar cada fase:

1. **Fase 1:** Ejecutar `npm run lint` y verificar accesibilidad con Lighthouse
2. **Fase 2:** Ejecutar `npm run build` y verificar bundle size
3. **Fase 3:** Ejecutar `npm run lint` y verificar estructura
4. **Fase 4:** Verificar manualmente en navegador

## Prioridad de Ejecución

1. **Fase 1** (Crítico): Accesibilidad y seguridad - Implementar primero
2. **Fase 2** (Alto): Performance - Implementar después de Fase 1
3. **Fase 3** (Medio): Arquitectura - Implementar cuando haya tiempo
4. **Fase 4** (Bajo): UX polish - Implementar al final
