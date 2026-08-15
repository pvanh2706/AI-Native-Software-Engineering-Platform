---
name: Jira Automation Admin
colors:
  surface: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#FCFCFD'
  surface-container: '#F2F4F7'
  surface-container-high: '#E4E7EC'
  surface-container-highest: '#D0D5DD'
  surface-variant: '#F2F4F7'
  background: '#F9FAFB'
  on-surface: '#101828'
  on-background: '#101828'
  on-surface-variant: '#667085'
  inverse-surface: '#1D2939'
  inverse-on-surface: '#F9FAFB'
  outline: '#828D9F'
  outline-variant: '#E4E7EC'
  primary: '#465FFF'
  on-primary: '#FFFFFF'
  primary-container: '#ECF3FF'
  on-primary-container: '#2A31D8'
  inverse-primary: '#9CB9FF'
  secondary: '#475467'
  on-secondary: '#FFFFFF'
  secondary-container: '#F2F4F7'
  on-secondary-container: '#344054'
  info: '#026AA2'
  on-info: '#FFFFFF'
  info-container: '#F0F9FF'
  on-info-container: '#026AA2'
  success: '#027A48'
  on-success: '#FFFFFF'
  success-container: '#ECFDF3'
  on-success-container: '#027A48'
  warning: '#B54708'
  on-warning: '#FFFFFF'
  warning-container: '#FFFAEB'
  on-warning-container: '#B54708'
  error: '#B42318'
  on-error: '#FFFFFF'
  error-container: '#FEF3F2'
  on-error-container: '#B42318'
typography:
  headline-lg:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.5rem
  lg: 0.75rem
  xl: 1rem
  full: 9999px
spacing:
  unit: 4px
  card-padding: 24px
  card-gap: 24px
  row-height: 44px
  table-px: 16px
  table-py: 12px
  gutter: 24px
  sidebar-width: 280px
---

## Brand & Style

A modern admin console for a Vietnamese internal IT tool — software people open many times a day to file and track Jira issues from templates. The personality is calm, spacious, and orderly: the kind of dashboard that feels current without shouting.

The structural idea is **white cards floating on a soft grey ground**. Content lives in generously rounded white panels; the page behind them is a light grey. That single move — not shadow, not heavy rules — is what creates depth. Cards carry a hairline border and, at most, a barely-there shadow.

Layouts must leave vertical room for stacked Vietnamese diacritics so accents never clip or collide.

## Colors

Every text-on-background pair below has been measured with the WCAG 2.x contrast formula. The numbers are measured results, not claims — change any value and it must be re-measured.

- **Ground and cards.** Page ground `#F9FAFB`. Cards and data-entry surfaces `#FFFFFF`. Sunken areas and table headers `#F2F4F7`.
- **Primary `#465FFF`** — a saturated indigo-blue for the single main action per screen and for the active navigation item. White text on it measures 4.84:1.
- **Six semantic roles**: `primary`, `secondary`, `info`, `success`, `warning`, `error`. Each has a solid tone, an `on-` text colour, a very light `container` tint, and an `on-container` text colour.
- **Status labels use the container pair.** A pill with a `-container` tint background and `on-container` text: success 5.13:1, warning 5.20:1, error 6.05:1, info 5.49:1. The four tints — green, amber, red, sky — are told apart at a glance without reading the label.
- **Solid tones are for buttons**, and each carries white text at 4.5:1 or better: info 5.86, success 5.41, warning 5.43, error 6.57.
- **Secondary text is `#667085`**, never lighter. It measures 4.97:1 on white and 4.76:1 on the grey ground. A lighter grey drops below 3:1 and stops being text.
- **Colour is never the only signal.** Every status carries a text label; icons where space allows.

## Borders and separation

- **`outline #828D9F`** — the boundary of anything interactive: inputs, selects, secondary buttons, checkboxes. 3.35:1 on white and 3.21:1 on the grey ground, so it satisfies WCAG 2.2 §1.4.11 on both grounds a control can sit on. Do not lighten it. A control whose boundary cannot be seen cannot be identified, and this is the single most common defect in admin templates.
- **`outline-variant #E4E7EC`** — card edges, table row dividers, section rules. Quiet on purpose: it separates, it does not identify.
- **No row striping.** Alternating backgrounds measure around 1.1:1 and are effectively invisible. Use the 1px `outline-variant` divider.
- **Depth comes from the card-on-ground relationship**, not from shadow. A shadow, if used at all, is `0 1px 2px rgba(16,24,40,0.05)` and never more.
- **Focus** is a 2px `primary` ring offset by 2px. Never a shadow, never a colour change alone.

## Typography

**Outfit** throughout — a geometric sans with open counters that keeps Vietnamese diacritics clear at small sizes. **JetBrains Mono** for issue keys, timestamps, and any column of digits, so figures align vertically.

- **Line height is deliberately generous** — `body-md` is 14/22 — so stacked tone marks such as ể and ộ never touch the line above.
- **Never use uppercase.** All-caps severely degrades the readability of Vietnamese accents. This applies to buttons, labels, and table column headers alike. Sentence case everywhere.
- Section labels in the sidebar are the one place a small, letter-spaced label is allowed, and even there in sentence case.

## Layout & Spacing

4px base unit. The page is a grey ground holding white cards with 24px internal padding and 24px between them.

- **Sidebar 280px**, white, fixed. Every navigation item carries an icon. The active item is a rounded `primary-container` block with `on-primary-container` text — not a thin edge stripe.
- **Top bar**: screen title on the left, and on the right only a theme toggle and the account avatar. No global search, no notification bell.
- **Data tables are dense, unlike the cards around them.** Row height 44px, cell padding 16px horizontal and 12px vertical, `body-md` at 14px. A 900px-tall window must show at least 12 rows. This is the one place the design deliberately departs from the airy dashboard look: this product is a table tool, and rows are the work.
- **Three widths must work**: ≥1440px, 1024–1439px (the most common — laptop 13–14"), and 768–1023px where the sidebar collapses to an icon rail. Below 768px is out of scope.

## Shapes

- Cards and panels: **16px** radius. This is the signature of the style — do not reduce it.
- Buttons, inputs, selects: **8px** radius.
- Status pills and avatars: fully rounded.
- Table cells: 0px, so grid lines stay aligned for scanning.

## Components

- **Buttons.** Primary is a filled `primary` background with white text — one per screen. Secondary is white with a 1px `outline` border. No ghost buttons for anything that matters.
- **Form fields.** The label always sits above the field and never moves into it. A persistent 1px `outline` border at rest; 2px `primary` on focus; 2px `error` plus an inline message on error. The message says what is wrong and how to fix it.
- **Data tables.** Rows on a white card, 1px `outline-variant` dividers, no vertical rules. Long strings wrap onto a second line; never truncate a data string in the markup itself.
- **Status pills.** `<role>-container` background, `on-<role>-container` text, fully rounded, 12px, always with a text label.
- **Stat tiles.** A row of small white cards above the main content: an icon in a rounded `surface-container` square, a quiet label in `on-surface-variant`, and a large figure in `on-surface`. Each tile is clickable and filters the table below it.
- **Row actions are always visible.** Never reveal an action on hover only — keyboard and touch users never reach it, and it measures as invisible.
- **Sidebar.** Grouped items with icons; the account block sits at the bottom and must stay inside the viewport no matter how long the page is.
