---
name: Nexus Enterprise
colors:
  surface: '#faf9ff'
  surface-dim: '#ccdaff'
  surface-bright: '#faf9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8ff'
  surface-container-highest: '#d8e2ff'
  on-surface: '#051a3e'
  on-surface-variant: '#434654'
  inverse-surface: '#1d3054'
  inverse-on-surface: '#edf0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#285ab9'
  on-secondary: '#ffffff'
  secondary-container: '#709bfe'
  on-secondary-container: '#003179'
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
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#b1c6ff'
  on-secondary-fixed: '#001946'
  on-secondary-fixed-variant: '#00419d'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812800'
  background: '#faf9ff'
  on-background: '#051a3e'
  surface-variant: '#d8e2ff'
typography:
  h1:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h2:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  h3:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  layout-margin: 24px
  layout-gutter: 16px
---

## Brand & Style
The design system is engineered for high-performance B2B environments and internal operations. It prioritizes utility, data density, and cognitive clarity over decorative elements. The visual language is **Corporate / Modern** with a lean toward **Minimalism**, stripping away non-functional aesthetics like gradients and decorative animations to focus on task completion.

The brand personality is authoritative, reliable, and precise. It targets professional users who interact with complex datasets and multi-step workflows. The emotional response should be one of control and efficiency. All UI elements follow a strict functional logic, ensuring that the interface recedes into the background so the data remains the primary focus.

## Colors
The color palette centers on "Jira Blue" as the primary action color, signifying reliability and familiarity in enterprise tools. 

- **Primary (#0052CC):** Used for primary buttons, active states, and key navigational highlights.
- **Surface Strategy:** 
    - **Light Mode:** Uses a "Snow" background with "Sky" grey secondary surfaces to separate sidebars and headers from the main content area.
    - **Dark Mode:** Utilizes deep navy tones rather than pure black to maintain readability of blue primary elements and reduce eye strain in high-density data views.
- **Status Colors:** Semantic colors (Success: #36B37E, Warning: #FFAB00, Error: #FF5630) are used strictly for communication, never for decoration.

## Typography
The system employs **Inter** for all functional and body text due to its exceptional legibility at small sizes and high x-height. **Hanken Grotesk** is used for headings to provide a subtle modern distinction for hierarchy.

For high-density interfaces:
- **Default Font Size:** 14px for standard body text.
- **Secondary Font Size:** 12px for supporting metadata, labels, and table content.
- **Case:** Labels for status badges and table headers use ALL CAPS with a slight letter-spacing of 0.02em - 0.04em to distinguish them from data.
- **Monospaced:** Use **JetBrains Mono** for ID strings, timestamps, and numerical data in tables to ensure vertical alignment.

## Layout & Spacing
The spacing system is based on a **4px baseline grid** to facilitate high-density layouts. 

- **Layout Model:** A 12-column fluid grid is preferred for dashboard views, allowing content to expand. For data-entry forms, a centered fixed-width container (max-width: 1200px) is recommended.
- **High Density:** Use `sm` (8px) for internal component padding and `md` (12px) for spacing between related elements.
- **Tables:** Data rows should have a fixed height of 40px (Standard) or 32px (Compact) to maximize the number of visible records on a single screen.
- **Breakpoints:**
    - Mobile: < 768px (Sidebars collapse to drawer).
    - Desktop: > 1024px (Fixed sidebar 240px wide).

## Elevation & Depth
This design system uses **Tonal Layers** and **Low-contrast Outlines** instead of heavy shadows to maintain a clean, professional look.

- **Layering:** 
    - Level 0 (Background): #F4F5F7 (Light) / #0747A6 (Dark).
    - Level 1 (Cards/Surface): #FFFFFF (Light) / #091E42 (Dark).
- **Outlines:** All containers, inputs, and cards use a 1px solid border (#DFE1E6 in light mode). 
- **Shadows:** Only used for "floating" elements like dropdown menus or modals. Use a single, tight, neutral shadow: `0 4px 12px rgba(9, 30, 66, 0.15)`.
- **Active State:** Focus states are indicated by a 2px offset ring in the primary color (#0052CC) to ensure accessibility.

## Shapes
The shape language is **Soft** (0.25rem/4px) for most components. This subtle rounding provides a modern feel without sacrificing the professional, "engineered" look of a B2B tool.

- **Standard (4px):** Buttons, Input fields, Cards, Modals.
- **Circular/Pill:** Only used for Status Badges and Avatars to distinguish them from interactive buttons.
- **Sharp (0px):** Table header cells and row separators.

## Components
Consistent implementation of these core components ensures the design system remains efficient.

- **Buttons:**
    - **Primary:** Filled Blue (#0052CC) with white text. No gradient.
    - **Secondary:** Light grey background (#F4F5F7) with primary text.
    - **Terrestrial/Ghost:** Transparent background, blue text. Used for secondary actions in tables.
- **Data Tables:**
    - Headers: Light grey background (#F4F5F7), bold text, 1px bottom border.
    - Rows: 1px bottom border, hover state changes background to #EBECF0.
    - Cell Padding: 8px horizontal, 12px vertical.
- **Status Badges:**
    - Small, pill-shaped, using low-saturation background colors with high-saturation text for readability (e.g., Success: Light Green bg / Dark Green text).
- **Input Fields:**
    - Height: 32px for high density.
    - Border: 1px solid (#DFE1E6). On focus: 1px solid (#0052CC) with a subtle outer glow.
- **Cards:** 
    - Flat design with 1px border. No shadow unless interactive. Header and Body separated by a 1px divider.
