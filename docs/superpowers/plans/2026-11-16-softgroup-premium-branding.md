# SoftGroup Premium Branding Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que el logo de SoftGroup tenga más presencia visual y que los íconos clave se vean más gráficos, detallados y premium sin romper el layout ni el lenguaje visual existente.

**Architecture:** La implementación se apoya en dos primitivas compartidas: un `BrandLogo` para centralizar tamaño/énfasis por contexto y un `PremiumIconBadge` para encapsular gradiente, glow, capas y profundidad. Luego se integran esas primitivas primero en chrome de marca (navbar/footer) y después en las secciones que más muestran iconografía.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, Framer Motion, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-11-16-softgroup-premium-branding-design.md`

## Global Constraints

- Conservar el logo aprobado en `public/logo-nav.png` y sus variantes existentes.
- Mantener compatibilidad con `Next.js 16`, `React 19`, `Tailwind 4` y `framer-motion`.
- Respetar `prefers-reduced-motion` y no reintroducir hydration mismatch.
- Mantener build limpio con `npm run build`.
- Mantener el estilo dark-first premium ya establecido en la web.
- El repo no tiene git local; los pasos de commit deben interpretarse como “agrupar estos archivos para un push con el script de GitHub” si `git` no está disponible.

## Review Focus

- Navbar mobile con logo ampliado: el CTA, los links y el botón hamburguesa deben seguir visibles y sin colisiones.
- Footer con logo e íconos sociales más destacados: no debe parecer más pesado que el contenido de contacto.
- Badges premium en superficies claras y oscuras: el contraste del ícono y del glow debe seguir siendo legible.
- `prefers-reduced-motion`: el upgrade visual no debe depender de animaciones para verse correcto ni reintroducir hydration mismatch.
- Cards con nuevo detalle gráfico: las alturas y alineaciones deben seguir uniformes entre items destacados y no destacados.

---

### Task 1: Crear primitivas compartidas de branding premium

**Files:**
- Create: `src/components/ui/BrandLogo.tsx`
- Create: `src/components/ui/PremiumIconBadge.tsx`
- Test: `tests/brand-logo.test.ts`
- Test: `tests/premium-icon-badge.test.ts`

**Interfaces:**
- Consumes: `public/logo-nav.png`
- Produces: `BrandLogo(props: BrandLogoProps): JSX.Element`
- Produces: `PremiumIconBadge(props: PremiumIconBadgeProps): JSX.Element`

```ts
type BrandLogoProps = {
  context: "navbar" | "footer";
  className?: string;
};

type PremiumIconBadgeProps = {
  icon: LucideIcon;
  tone: "brand" | "cyan" | "violet" | "emerald" | "amber" | "rose";
  surface?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
  iconClassName?: string;
};
```

- [ ] **Step 1: Write the failing tests**

```ts
// tests/brand-logo.test.ts
it("renders the navbar logo with larger premium sizing classes", () => {
  render(<BrandLogo context="navbar" />);
  const img = screen.getByAltText("SoftGroup");
  expect(img).toHaveAttribute("src", "/logo-nav.png");
  expect(img.className).toMatch(/h-10/);
});

it("renders the footer logo with a larger footprint than the navbar baseline", () => {
  render(<BrandLogo context="footer" />);
  expect(screen.getByAltText("SoftGroup").className).toMatch(/h-11|h-12/);
});

// tests/premium-icon-badge.test.ts
it("renders layered premium styling for a dark surface badge", () => {
  render(<PremiumIconBadge icon={Rocket} tone="brand" surface="dark" size="lg" />);
  const badge = screen.getByTestId("premium-icon-badge");
  expect(badge.className).toMatch(/rounded-2xl/);
  expect(badge.className).toMatch(/from-/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/brand-logo.test.ts tests/premium-icon-badge.test.ts`  
Expected: FAIL with missing modules/components

- [ ] **Step 3: Implement `BrandLogo` in `src/components/ui/BrandLogo.tsx`**

Use `/logo-nav.png` inside a branded wrapper that adds size, spacing, and subtle glow/ring emphasis. `context="navbar"` must favor width efficiency; `context="footer"` can use a slightly larger footprint and stronger ambient emphasis.

- [ ] **Step 4: Implement `PremiumIconBadge` in `src/components/ui/PremiumIconBadge.tsx`**

Render one reusable wrapper with layered gradient background, inner highlight, border, and icon foreground. The component must expose the tone and surface variants above, default `surface="light"` and `size="md"`, and include `data-testid="premium-icon-badge"` on the outer badge.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/brand-logo.test.ts tests/premium-icon-badge.test.ts`  
Expected: PASS

- [ ] **Step 6: Commit**

If `git` is available:

```bash
git add src/components/ui/BrandLogo.tsx src/components/ui/PremiumIconBadge.tsx tests/brand-logo.test.ts tests/premium-icon-badge.test.ts
git commit -m "feat: add premium branding primitives"
```

If `git` is not available: prepare the same file set for one GitHub push step with message `feat: add premium branding primitives`.

### Task 2: Aplicar el sistema al logo principal y al footer

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Test: `tests/brand-logo.test.ts`

**Interfaces:**
- Consumes: `BrandLogo(props: BrandLogoProps): JSX.Element`
- Consumes: `PremiumIconBadge(props: PremiumIconBadgeProps): JSX.Element`
- Produces: navbar/footer using shared branding primitives without changing navigation behavior

- [ ] **Step 1: Extend `tests/brand-logo.test.ts` with integration assertions**

```ts
it("renders BrandLogo in Navbar without removing the mobile menu button", () => {
  render(<Navbar />);
  expect(screen.getByAltText("SoftGroup")).toBeTruthy();
  expect(screen.getByLabelText(/abrir menú/i)).toBeTruthy();
});

it("renders premium social badges in Footer", () => {
  render(<Footer />);
  expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/brand-logo.test.ts`  
Expected: FAIL because `Navbar`/`Footer` still render legacy logo/icon wrappers

- [ ] **Step 3: Replace the raw logo image in `src/components/Navbar.tsx` with `BrandLogo`**

Keep the current scroll/menu behavior intact. Increase the nav row height and horizontal spacing only as much as needed so the larger premium logo breathes on desktop and mobile.

- [ ] **Step 4: Replace the raw logo image and social icon wrappers in `src/components/Footer.tsx`**

Use `BrandLogo context="footer"` for the lockup and wrap social icons with `PremiumIconBadge` while preserving external links and accessible labels.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/brand-logo.test.ts`  
Expected: PASS

- [ ] **Step 6: Verify the chrome visually**

Run the app and verify:
- desktop navbar still fits links + CTA
- mobile navbar still shows the hamburger cleanly
- footer logo is visibly larger and more premium, but not heavier than the contact column

- [ ] **Step 7: Commit**

If `git` is available:

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx tests/brand-logo.test.ts
git commit -m "feat: upgrade brand presentation in header and footer"
```

If `git` is not available: prepare the same file set for one GitHub push step with message `feat: upgrade brand presentation in header and footer`.

### Task 3: Aplicar badges premium a las secciones con iconografía principal

**Files:**
- Modify: `src/components/Services.tsx`
- Modify: `src/components/AIAgent.tsx`
- Modify: `src/components/Process.tsx`
- Modify: `src/components/Stats.tsx`
- Test: `tests/premium-icon-badge.test.ts`

**Interfaces:**
- Consumes: `PremiumIconBadge(props: PremiumIconBadgeProps): JSX.Element`
- Produces: consistent premium icon treatment across primary service, AI, process, and stats sections

- [ ] **Step 1: Extend `tests/premium-icon-badge.test.ts` with section integration coverage**

```ts
it("renders premium icon badges inside Services cards", () => {
  render(<Services />);
  expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
});

it("renders premium icon badges on dark sections without losing icon visibility", () => {
  render(<AIAgent />);
  expect(screen.getAllByTestId("premium-icon-badge").length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/premium-icon-badge.test.ts`  
Expected: FAIL because those sections still use direct icon wrappers

- [ ] **Step 3: Integrate `PremiumIconBadge` into `src/components/Services.tsx` and `src/components/AIAgent.tsx`**

Use light-surface variants for `Services`; use dark-surface variants for `AIAgent`. Keep copy, spacing hierarchy, and current motion behavior intact while making the icons visibly more layered and graphic.

- [ ] **Step 4: Integrate `PremiumIconBadge` into `src/components/Process.tsx` and `src/components/Stats.tsx`**

Keep card heights, timeline alignment, and stat readability stable. Where the badge replaces the old flat icon box, preserve the same semantic icon component and label text.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/premium-icon-badge.test.ts`  
Expected: PASS

- [ ] **Step 6: Run full verification**

Run: `npx vitest run`  
Expected: PASS

Run: `npm run build`  
Expected: PASS with no hydration mismatch and no OG warnings

- [ ] **Step 7: Review the five focus areas manually**

- Navbar mobile with enlarged logo still fits and remains tappable
- Footer still feels balanced
- Premium badges remain legible on both light and dark sections
- Reduced-motion mode still loads without console hydration errors
- Grid/timeline/stats alignment remains even after badge replacement

- [ ] **Step 8: Commit**

If `git` is available:

```bash
git add src/components/Services.tsx src/components/AIAgent.tsx src/components/Process.tsx src/components/Stats.tsx tests/premium-icon-badge.test.ts
git commit -m "feat: apply premium icon system across landing sections"
```

If `git` is not available: prepare the same file set for one GitHub push step with message `feat: apply premium icon system across landing sections`.
