---
version: 1.0.0
name: APEX Dark Telemetry
description: Precision racing telemetry visual language for the APEX Sim Racing Academy. High contrast, dark slate base, vibrant telemetry accents (Green, Amber, Red), non-gamified objective coaching UI inspired by industrial engineering and professional motorsport.
colors:
  primary: "#00E599"        # Telemetry Green (mastery, optimal delta, active telemetry)
  primary-hover: "#00FFAB"
  secondary: "#3B82F6"      # Telemetry Blue (curriculum, information, telemetry trace)
  secondary-hover: "#60A5FA"
  warning: "#FFB800"        # Telemetry Amber (remediation required, threshold warning)
  danger: "#FF3B30"         # Apex Red (critical error, abrupt input, apex missed)
  neutral-bg: "#090A0F"     # Matte Charcoal Base (Surface 0)
  neutral-surface: "#12151E" # Dark Steel Panel & Card Surface (Surface 1 & 2)
  neutral-surface-hover: "#1A1E2B"
  neutral-border: "#262C3D" # Border & Grid Dividers
  neutral-text: "#F3F4F6"   # Crisp Telemetry Off-White Text
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
    textColor: "{colors.neutral-bg}"
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

# APEX Sim Racing Academy — Design Specification

## Overview

APEX is a **curriculum-driven sim racing academy** designed for complete beginners utilizing the Moza R3 Racing Wheel and Forza Motorsport (2023).

The visual design language is strictly **non-gamified, objective, and telemetry-focused**. Inspired by real-world motorsport telemetry software (Moza Pit House, MotEC i2 Pro, McLaren Applied Technologies), APEX avoids cartoonish gamification or superficial rewards in favor of precision, clarity, and disciplined coaching interfaces.

> **Design Statement:** Professional driver education powered by industrial-grade interface design.

---

## Colors

The APEX color system is functional, meaningful, and disciplined.

- **Primary Background (`#090A0F`):** Matte Charcoal base (Surface 0).
- **Primary Surface (`#12151E`):** Dark Steel panel and card surface (Surface 1 & 2).
- **Border Divider (`#262C3D`):** Low-contrast gridlines and container borders.
- **Telemetry Green (`#00E599`):** Represents optimal performance, demonstrated mastery, passing criteria, and active telemetry.
- **Telemetry Blue (`#3B82F6`):** Information, active navigation, curriculum progress, and telemetry trace.
- **Telemetry Amber (`#FFB800`):** Remediation required, threshold warnings, and sub-optimal technique.
- **Apex Red (`#FF3B30`):** Highlights critical technique errors (abrupt brake release, severe lock-up, missed apex).
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
- **Background Grid:** Subtle 32px telemetry gridlines (`#262C3D` at 30% opacity).
- **Responsive Behavior:** On tablet, Coach Console collapses into a slide-out drawer; on mobile, content wraps into a single column.

---

## Elevation & Depth

Surfaces resemble stacked industrial engineering panels. Elevation is communicated through **brightness gradient steps** rather than heavy drop shadows:

- **Surface 0 (`#090A0F`):** Application Canvas Background.
- **Surface 1 (`#12151E`):** Navigation Bar, Header, and Coach Console.
- **Surface 2 (`#1A1E2B`):** Cards, Panels, and Interactive Controls.
- **Surface 3 (`#262C3D`):** Active Selection & Hover States.
- **Surface 4 (`#12151E` with `#00E599` outline):** Dialog Modals.

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
- **Button:** Primary (`#00E599`), Secondary (`#3B82F6`), Telemetry/Ghost (`#12151E` with `#262C3D` border), Danger (`#FF3B30`).
- **Card:** Dark steel background (`#12151E`), 1px border (`#262C3D`), 12px radius.
- **Badge:** Pill shape (`rounded-full`) with semantic telemetry state colors.
- **TelemetryBar:** Quantitative progress bar displaying target vs actual threshold.

### 2. Academy Components
- **LearningObjective:** Displays session objective, expected outcome, and time estimate in `IBM Plex Sans`.
- **TheoryBlock:** Technical instructional content with key takeaways and telemetry diagrams.
- **CoachNote:** Contextual coaching callouts providing immediate instructional feedback.
- **DrillCard:** Single-skill practical exercise specifications.

### 3. Motorsport Components
- **CoachConsole:** Persistent contextual coaching panel showing current objective, mastery criteria, and prescriptions.
- **TrainingPrescription:** Clear practice parameters (Track, Car, Weather, Transmission, Assists).
- **MasteryIndicator:** Factual indicator (Not Started, In Progress, Mastered, Remediation Required).

---

## Do's and Don'ts

- **DO** use monospace font (`JetBrains Mono`) for all numerical telemetry data and lap times.
- **DO** maintain strict WCAG AA contrast (4.5:1 ratio) across all text elements.
- **DO** present objective feedback (e.g. `Brake release variance: 14% (Pass: <5%)`).
- **DON'T** use gamified elements like trophies, stars, celebratory confetti, or artificial XP points.
- **DON'T** allow skipping of locked curriculum modules.
- **DON'T** use glossy gradients or glassmorphism blurs that distract from telemetry data.
