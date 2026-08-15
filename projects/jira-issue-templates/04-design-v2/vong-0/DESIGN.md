---
name: Pro-Density V-System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cadaff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8edff'
  surface-container-high: '#e0e8ff'
  surface-container-highest: '#d7e2ff'
  on-surface: '#041b3c'
  on-surface-variant: '#434654'
  inverse-surface: '#1d3052'
  inverse-on-surface: '#edf0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#4f5f7b'
  on-secondary: '#ffffff'
  secondary-container: '#cdddff'
  on-secondary-container: '#51617e'
  tertiary: '#7b2600'
  on-tertiary: '#ffffff'
  tertiary-container: '#a33500'
  on-tertiary-container: '#ffc6b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b7c7e8'
  on-secondary-fixed: '#091c35'
  on-secondary-fixed-variant: '#374763'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#f9f9ff'
  on-background: '#041b3c'
  surface-variant: '#d7e2ff'
typography:
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  code:
    fontFamily: jetbrainsMono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 16px
  element-gap: 8px
  table-cell-padding: 8px 12px
  grid-columns: '12'
  gutter: 16px
---

## Brand & Style
The design system is engineered for high-efficiency Vietnamese IT environments. The personality is industrious, systematic, and uncompromisingly functional. It prioritizes information density and legibility over decorative elements, ensuring that complex data structures remain navigable during long work sessions.

The visual style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes a strict white-base architecture to maximize contrast and reduce cognitive load. Visual hierarchy is established through structural alignment and purposeful color application rather than depth or shadows. The design must accommodate the vertical space required by Vietnamese diacritics, ensuring accents do not clash with line height or upper-tier elements.

## Colors
The palette is strictly functional, adhering to WCAG AA contrast standards.
- **Primary:** A deep, professional blue used for primary actions and active states.
- **Neutral/Text:** High-contrast grays and dark blues for maximum readability against white backgrounds.
- **Semantic/Status:** Distinct, high-saturation colors for state indication. These must always be accompanied by labels or icons to ensure accessibility.
- **Surface:** A pure white (`#FFFFFF`) is used for all data-entry and content areas to ensure the sharpest possible text rendering. Secondary backgrounds use a very light cool gray to differentiate layout sections.

## Typography
This design system uses **Inter** for its superior handling of Vietnamese diacritics and its neutral, systematic aesthetic.
- **Line Height:** Set slightly higher than standard (1.5x for body text) to prevent "accidental touching" of stacked Vietnamese accents (e.g., ể, ộ).
- **Density:** Body text is centered at 14px for general use and 12px for high-density data tables.
- **Casing:** Use Sentence case for all headings and labels. Never use All-Caps, as it severely degrades the legibility of Vietnamese tone marks and accents.

## Layout & Spacing
The layout follows a **Fluid Grid** model with strict 4px increments.
- **Density:** Content-heavy views utilize tight padding (8px or 12px) to maximize the amount of visible data on screen.
- **Structure:** A standard 12-column grid is used for dashboards, while a sidebar-main-panel pattern is preferred for administrative tools.
- **Breakpoints:**
  - Mobile: < 640px (Hide secondary columns, use full-width stacks).
  - Tablet: 640px - 1024px (Collapse sidebar to icons).
  - Desktop: > 1024px (Fixed persistent sidebar, fluid content).

## Elevation & Depth
In this design system, depth is conveyed through **Low-contrast outlines** and **Tonal layers** rather than shadows.
- **Borders:** Use 1px solid borders (`#D1D5DB`) to define containers.
- **Z-Axis:** Instead of drop shadows, use slightly darker background shades (e.g., `#EBECF0`) for "sunken" areas like search bars or code blocks.
- **Active State:** Use a 2px primary color border or a subtle 4px "soft glow" only to indicate focus/selection in high-interactivity components.

## Shapes
Shapes are **Soft** (4px - 6px) to maintain a professional, systematic appearance without feeling aggressive.
- **Buttons & Inputs:** Use a consistent 4px radius.
- **Cards & Containers:** Use a 6px radius.
- **Data Tables:** Maintain sharp corners (0px) for internal cells to ensure grid lines remain perfectly aligned for scanning.

## Components
- **Buttons:** Large, persistent action buttons with high-contrast text. Secondary buttons must have a clear 1px border. No "ghost" buttons for primary actions.
- **Form Fields:** Permanent top-aligned labels (never floating). Fields must have a visible 1px border at all times. Error states use a 2px red border and an inline message.
- **Data Tables:** High-density rows (32px-40px height). Alternate row striping (`#F4F5F7`) is mandatory for readability across long horizontal spans.
- **Status Chips:** Rectangular with 2px radius, utilizing light background tints with dark text of the corresponding semantic color (e.g., Light Green BG with Dark Green Text).
- **Navigation:** Persistent vertical sidebar with clear active indicators (Left-edge 4px primary stripe).
- **Action Triggers:** All critical actions (Delete, Edit, Save) must be visible icons or labeled buttons. Avoid hover-triggered visibility to ensure accessibility and speed of use.
