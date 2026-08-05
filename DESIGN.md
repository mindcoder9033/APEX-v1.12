---
version: 1.1.0
name: APEX F1 Red Telemetry
description: Precision racing telemetry visual language for the APEX Sim Racing Academy. High contrast F1 Pit-Garage pure carbon base (#08080A), iconic F1 Red accents (#E10600), high-contrast Racing Amber warnings (#FFB800), and objective non-gamified coaching UI inspired by Formula 1 engineering and telemetry workstations.
colors:
  primary: "#E10600"        # F1 Red (mastery, optimal delta, primary brand, active telemetry)
  primary-hover: "#FF1E19"
  secondary: "#3B82F6"      # Telemetry Blue (curriculum trace, secondary information)
  secondary-hover: "#60A5FA"
  warning: "#FFB800"        # Racing Amber (error alert, threshold warning, remediation required)
  danger: "#FFB800"         # High-Contrast Alert Amber
  neutral-bg: "#08080A"     # F1 Pit-Garage Pure Carbon Base (Surface 0)
  neutral-surface: "#121216" # Dark Carbon Panel & Card Surface (Surface 1 & 2)
  neutral-surface-hover: "#1A1A20"
  neutral-border: "#262630" # Border & Telemetry Grid Dividers
  neutral-text: "#F3F4F6"   # Crisp Off-White Telemetry Text
  neutral-muted: "#9CA3AF"  # Secondary Text & Labels (Cool Gray)
  neutral-dim: "#4B5563"    # Disabled / Locked items
typography:
  headline-display:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
  headline-md:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.4
  body-md:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  learning-body:
    fontFamily: IBM Plex Sans, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  learning-heading:
    fontFamily: IBM Plex Sans, sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  telemetry-mono:
    fontFamily: JetBrains Mono, monospace
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.neutral-border}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-telemetry:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.neutral-border}"
  badge:
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# APEX Sim Racing Academy — F1 Red Design Specification

## Overview

APEX is a **curriculum-driven sim racing academy** designed for complete beginners utilizing the Moza R3 Racing Wheel and Forza Motorsport (2023).

The visual design language is strictly **non-gamified, objective, and telemetry-focused** with an iconic **Formula 1 Pit-Garage** aesthetic. F1 Red (`#E10600`) serves as the dominant brand color and mastery indicator against a pitch-black pure carbon base (`#08080A`).

> **Design Statement:** Professional driver education powered by Formula 1 telemetry interface design.

---

## Colors

The APEX color system is functional, high-contrast, and disciplined:

- **Primary Background (`#08080A`):** F1 Pit-Garage Pure Carbon base (Surface 0).
- **Primary Surface (`#121216`):** Dark Carbon panel and card surface (Surface 1 & 2).
- **Border Divider (`#262630`):** Low-contrast gridlines and container borders.
- **F1 Red (`#E10600`):** Represents primary actions, active brand identity, demonstrated mastery, passing criteria, and active telemetry traces.
- **Telemetry Blue (`#3B82F6`):** Information, active navigation, curriculum progress, and secondary telemetry traces.
- **Racing Amber (`#FFB800`):** High-contrast warning alerts, missed apexes, threshold warnings, and remediation indicators.
- **Telemetry Text (`#F3F4F6`):** Crisp off-white typography for high contrast under cockpit lighting.
- **Cool Gray (`#9CA3AF`):** Secondary metadata labels and supporting text.

---

## Typography

APEX utilizes three distinct font families for specialized roles:

1. **UI Typography (`Inter`):** Modern, clean sans-serif for application headers, navigation buttons, cards, forms, and general controls.
2. **Learning Typography (`IBM Plex Sans`):** Technical training manual typography for session theory, coach notes, learning objectives, and educational content.
3. **Telemetry Typography (`JetBrains Mono`):** Monospace font reserved for objective performance metrics, split times, lap times, input percentages, and telemetry trace logs.

---

## Layout & Grid System (Engineering Workstation)

APEX implements a desktop-first **Engineering Workstation** layout consisting of three persistent regions:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Application Header                                                           │
├──────────────┬──────────────────────────────────────────────┬────────────────┤
│ Adaptive     │ Main Workspace                               │ Coach Console  │
│ Navigation   │ (Theory, Drills, Assessments)                │ (Contextual    │
│ Sidebar      │                                              │ Guidance)      │
└──────────────┴──────────────────────────────────────────────┴────────────────┘
```

- **Maximum Content Width:** 1440px.
- **Background Grid:** Subtle 32px telemetry gridlines (`#262630` at 30% opacity).
- **Responsive Behavior:** On tablet, Coach Console collapses into a slide-out drawer; on mobile, content wraps into a single column.

---

## Elevation & Depth

Surfaces resemble stacked industrial engineering panels. Elevation is communicated through **brightness gradient steps** rather than heavy drop shadows:

- **Surface 0 (`#08080A`):** Application Canvas Background.
- **Surface 1 (`#121216`):** Navigation Bar, Header, and Coach Console.
- **Surface 2 (`#1A1A20`):** Cards, Panels, and Interactive Controls.
- **Surface 3 (`#262630`):** Active Selection & Hover States.
- **Surface 4 (`#121216` with `#E10600` outline):** Dialog Modals.

---

## Shapes & Precision Geometry

Geometry communicates industrial quality and precision:

- **Buttons & Inputs:** `8px` corner radius (`rounded-md`).
- **Cards, Panels & Coach Console:** `12px` corner radius (`rounded-lg`).
- **Modals & Dialogs:** `16px` corner radius (`rounded-xl`).
- **Status Chips & Badges:** `9999px` Pill shape (`rounded-full`).

---

## Components

The component system consists of three distinct layers:

### 1. Foundation Components
- **Button:** Primary (`#E10600`), Secondary (`#3B82F6`), Telemetry/Ghost (`#121216` with `#262630` border), Danger (`#FFB800`).
- **Card:** Dark carbon background (`#121216`), 1px border (`#262630`), 12px radius.
- **Badge:** Pill shape (`rounded-full`) with F1 Red or Racing Amber state colors.
- **TelemetryBar:** Quantitative progress bar displaying target vs actual threshold in F1 Red.

### 2. Academy Components
- **LearningObjective:** Displays session objective, expected outcome, and time estimate in `IBM Plex Sans`.
- **TheoryBlock:** Technical instructional content with key takeaways and telemetry diagrams.
- **CoachNote:** Contextual coaching callouts providing immediate instructional feedback.
- **DrillCard:** Single-skill practical exercise specifications.

### 3. Motorsport Components
- **CoachConsole:** Persistent contextual coaching panel showing current objective, mastery criteria, and prescriptions in F1 Red.
- **TrainingPrescription:** Clear practice parameters (Track, Car, Weather, Transmission, Assists).
- **MasteryIndicator:** Factual indicator in F1 Red (Not Started, In Progress, Mastered, Remediation Required).

---

## Do's and Don'ts

- **DO** use F1 Red (`#E10600`) as the dominant primary brand and mastery accent color.
- **DO** use Racing Amber (`#FFB800`) for errors and warnings to ensure clear contrast against F1 Red.
- **DO** use monospace font (`JetBrains Mono`) for all numerical telemetry data and lap times.
- **DO** maintain strict WCAG AA contrast (4.5:1 ratio) across all text elements.
- **DON'T** use gamified elements like trophies, stars, celebratory confetti, or artificial XP points.
- **DON'T** mix green accent colors into the UI; F1 Red is the single mastery accent.
