---
version: 1.0.0
name: APEX Dark Telemetry
description: Precision racing telemetry visual language for the APEX Sim Racing Academy. High contrast, dark slate base, vibrant telemetry accents (Green, Amber, Red), non-gamified objective coaching UI.
colors:
  primary: "#00E599"        # Telemetry Green (mastery, optimal delta, active telemetry)
  primary-hover: "#00FFAB"
  secondary: "#3B82F6"      # Telemetry Blue (curriculum, information, telemetry trace)
  warning: "#FFB800"        # Telemetry Amber (remediation required, threshold warning)
  danger: "#FF3B30"         # Apex Red (critical error, abrupt input, apex missed)
  neutral-bg: "#090A0F"     # Deepest Carbon Base
  neutral-surface: "#12151E" # Card & Panel Surface
  neutral-surface-hover: "#1A1E2B"
  neutral-border: "#262C3D" # Border & Grid Dividers
  neutral-text: "#F3F4F6"   # Crisp Telemetry Text
  neutral-muted: "#9CA3AF"  # Secondary Text & Labels
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
  telemetry-mono:
    fontFamily: JetBrains Mono, monospace, system-ui
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.neutral-border}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-telemetry:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.neutral-border}"
---

# APEX Sim Racing Academy — Design Specification

## Overview

APEX is a **curriculum-driven sim racing academy** designed for complete beginners utilizing the Moza R3 Racing Wheel and Forza Motorsport (2023).

The visual design language is strictly **non-gamified, objective, and telemetry-focused**. Inspired by real-world motorsport telemetry software (Moza Pit House, MotEC i2 Pro, McLaren Applied Technologies), APEX avoids cartoonish gamification or superficial rewards in favor of precision, clarity, and disciplined coaching interfaces.

## Colors

- **Telemetry Green (`#00E599`):** Represents optimal performance, demonstrated mastery, passing criteria, and active telemetry.
- **Telemetry Amber (`#FFB800`):** Indicates remediation requirement, consistency warnings, and sub-optimal technique.
- **Apex Red (`#FF3B30`):** Highlights critical technique errors (abrupt brake release, severe lock-up, missed apex).
- **Carbon Surface (`#12151E`):** Dark slate panel background providing high-contrast readability under simulated cockpit lighting.
- **Telemetry Monospace (`JetBrains Mono`):** Used for objective delta values, lap times, and telemetry input percentages.

## Typography

APEX utilizes clean, modern sans-serif typography (`Inter`) for structural interfaces paired with monospace (`JetBrains Mono`) for telemetry data, split times, and objective metrics.

## Layout & Grid System

- Dark cockpit baseline theme (`#090A0F`).
- Subtle gridlines (`#262C3D`) reminiscent of telemetry graphs and track section telemetry overlays.
- Responsive container bounds with max-width `1280px` for optimal wide-screen cockpit visibility.

## Coaching Principles in UI

1. **Objective Metrics Only:** No "Great Job!" banners. Display exact quantitative feedback (e.g., `Brake release variance: 14% (Pass: <5%)`).
2. **Mastery Progression:** Content cards for unearned modules show explicit lock criteria (`Prerequisite: Complete Session 1.2 Drill B`).
3. **Hardware Focus:** Prominent Moza R3 configuration indicators and telemetry input mapping feedback.

## Do's and Don'ts

- **DO** use monospace fonts for all numerical performance data and lap times.
- **DO** maintain strict 4.5:1 WCAG AA contrast ratio across all text and indicators.
- **DON'T** use casual gamified icons like trophy cups, stars, or celebratory confetti.
- **DON'T** allow skipping of locked curriculum modules.
