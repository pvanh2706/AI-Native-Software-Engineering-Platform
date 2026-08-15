---
name: Pro-Density V-System
colors:
  surface: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F7F8FA'
  surface-container: '#F1F3F9'
  surface-container-high: '#E8EBF1'
  surface-container-highest: '#E1E5EC'
  surface-variant: '#E1E5EC'
  background: '#F9F9FB'
  on-surface: '#1A1C1C'
  on-background: '#1A1C1C'
  on-surface-variant: '#434654'
  inverse-surface: '#2F3131'
  inverse-on-surface: '#F0F1F1'
  outline: '#828A97'
  outline-variant: '#CFD5DC'
  primary: '#0052CC'
  on-primary: '#FFFFFF'
  primary-container: '#D6E4FF'
  on-primary-container: '#001D4D'
  inverse-primary: '#B2C5FF'
  secondary: '#4B5563'
  on-secondary: '#FFFFFF'
  secondary-container: '#F1F3F9'
  on-secondary-container: '#1F2937'
  info: '#0369A1'
  on-info: '#FFFFFF'
  info-container: '#E0F2FE'
  on-info-container: '#075985'
  success: '#15803D'
  on-success: '#FFFFFF'
  success-container: '#DCFCE7'
  on-success-container: '#166534'
  warning: '#B45309'
  on-warning: '#FFFFFF'
  warning-container: '#FEF3C7'
  on-warning-container: '#92400E'
  error: '#DC2626'
  on-error: '#FFFFFF'
  error-container: '#FEE2E2'
  on-error-container: '#991B1B'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
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
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
  code:
    fontFamily: JetBrains Mono
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
  row-height-sm: 32px
  row-height-md: 40px
  table-px: 12px
  table-py: 8px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is built for high-density Vietnamese enterprise tools — software people open many times a day to do repetitive work. The personality is industrious, systematic, and uncompromisingly functional. It favours information density and legibility over decoration.

The visual style is Corporate / Modern with a strict Minimalist execution, on a white base to maximise contrast and reduce cognitive load. Hierarchy comes from structural alignment and purposeful colour, not from depth or shadow. Layouts must leave vertical room for stacked Vietnamese diacritics so accents never clip or collide.

## Colors

Every text-on-background pair below has been measured with the WCAG 2.x contrast formula. Values are not aspirational — they are the measured result, and a change to any of them must be re-measured.

- **Surfaces.** `#FFFFFF` for content and data-entry areas. `#F1F3F9` for layout layering — sidebars, table headers, sunken areas. `#F9F9FB` for the page ground behind panels.
- **Primary** `#0052CC` for the single main action per screen. White text on it measures 6.82:1.
- **Six semantic roles.** `primary`, `secondary`, `info`, `success`, `warning`, `error`. Each has a solid tone, an `on-` text colour, a light `container` tint, and an `on-container` text colour.
- **Status labels use the container pair, not the solid tone.** In tables and lists, a status reads as `success-container` background with `on-success-container` text. The four container pairs measure 6.37:1 to 6.80:1. The four tints — sky, green, amber, red — are distinguishable at a glance without reading the label.
- **Solid tones are for buttons only**, and every solid tone carries white text at 4.5:1 or better: `info #0369A1` (5.93), `success #15803D` (5.02), `warning #B45309` (5.02), `error #DC2626` (4.83).
- **Colour is never the only signal.** Every status carries a text label, and an icon where space allows.

## Borders and separation

Box shadows are prohibited. Depth comes from outlines and tonal layers only — which means the outlines have to be genuinely visible, not decorative hairlines.

- **`outline #828A97`** for the boundary of any interactive control: inputs, selects, secondary buttons, checkboxes. Measures 3.48:1 on `#FFFFFF` and 3.14:1 on `#F1F3F9`, so it satisfies WCAG 2.2 §1.4.11 on both grounds a control can sit on. Do not lighten it — a control whose boundary cannot be seen cannot be identified.
- **`outline-variant #CFD5DC`** for separation that is not a control boundary: horizontal dividers between table rows, section rules. 1.48:1 — deliberately quiet, because it separates rather than identifies.
- **No row striping.** Alternating row background was measured at 1.09:1 and is effectively invisible; use the 1px `outline-variant` divider instead.
- **Focus** is a 2px `primary` outline offset by 2px. Never a shadow, never a colour change alone.

## Typography

Inter throughout, for its neutral tone and its handling of Vietnamese diacritics. JetBrains Mono for issue keys, timestamps, and any column of digits, so figures align vertically.

- **Line height is deliberately generous** — `body-md` is 14/22 — so stacked tone marks such as ể and ộ never touch the line above.
- **Never use uppercase.** All-caps severely degrades the readability of Vietnamese accents. This applies to buttons, labels, and table column headers alike. Sentence case everywhere.
- **Density:** `body-sm` (12px) in data grids, `body-md` (14px) for general text, `label-md` for form labels.

## Layout & Spacing

Fluid grid on a 4px base unit.

- **Data tables:** row height 32px (compact) to 40px (standard), cell padding 12px horizontal and 8px vertical.
- **Desktop (>1024px):** fixed 240px sidebar, fluid content. **Tablet (640–1024px):** sidebar collapses to an icon rail, margins drop to 16px. **Mobile (<640px):** single column, sidebar becomes a drawer.
- Page margin 24px, gutter 16px.

## Shapes

- Buttons, inputs, and small controls: 4px radius.
- Cards and panels: 6px radius.
- Table cells and headers: 0px, so grid lines stay aligned for scanning.

## Components

- **Buttons.** Primary is a filled `primary` background with white text — one per screen. Secondary is a white background with a 1px `outline` border. No ghost buttons for anything that matters.
- **Form fields.** The label always sits above the field and never moves into it. A persistent 1px `outline` border at rest; 2px `primary` on focus; 2px `error` plus an inline message on error. The message says what is wrong and how to fix it.
- **Data tables.** High-density rows, 1px `outline-variant` horizontal dividers, no vertical rules inside the table body. Long strings wrap; never truncate a data string in the markup itself.
- **Status indicators.** `<role>-container` background with `on-<role>-container` text, 2px radius, always with a text label.
- **Row actions are always visible.** Never reveal an action on hover only — keyboard and touch users never reach it, and it measures as invisible.
- **Navigation.** Vertical sidebar with a 4px `primary` left-edge stripe marking the active item. The account block sits at the bottom of the sidebar and must stay inside the viewport.
