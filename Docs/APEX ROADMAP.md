# APEX Development Roadmap

**Version:** 1.0
**Product:** APEX
**Objective:** Deliver a production-ready, curriculum-driven sim racing academy for complete beginners using the Moza R3 Wheel and Forza Motorsport (2023).

---

# Development Philosophy

APEX is not developed feature-first.

It is developed **foundation-first**.

Every development phase must produce a usable, testable product increment while protecting the core educational philosophy.

The implementation order is:

```text
Foundation

↓

Curriculum Engine

↓

Learning Experience

↓

Assessment

↓

Progress Tracking

↓

Polish

↓

Launch
```

---

# Project Milestones

| Milestone | Goal                            |
| --------- | ------------------------------- |
| M1        | Project Foundation              |
| M2        | Authentication & Driver Profile |
| M3        | Curriculum Engine               |
| M4        | Session Player                  |
| M5        | Assessment Engine               |
| M6        | Dashboard & Progress            |
| M7        | Certifications                  |
| M8        | MVP Polish                      |
| M9        | Beta Release                    |
| M10       | Public Launch                   |

---

# Phase 1 — Project Foundation

**Duration:** Week 1–2

## Objective

Build the project's technical foundation.

## Deliverables

### Repository

* Git Repository
* Branching Strategy
* CI/CD Pipeline
* Issue Templates
* Pull Request Templates

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Routing
* Design System
* Theme Configuration

### Backend

* Supabase Project
* Authentication
* PostgreSQL Database
* Storage
* Row Level Security

### Engineering

* ESLint
* Prettier
* Husky
* Testing Framework
* Environment Variables

## Exit Criteria

* Application builds successfully.
* CI passes.
* Local development environment documented.

---

# Phase 2 — Authentication & Driver Profile

**Duration:** Week 3

## Objective

Allow learners to create and manage a single academy account.

## Features

### Authentication

* Register
* Login
* Logout
* Password Reset

### Driver Profile

* Driver Name
* Academy Progress
* Preferences

### Settings

* Theme
* Accessibility
* Notifications

## Database

* Users
* Driver Profiles
* Settings

## Exit Criteria

* User can create an account.
* User can log in.
* User profile persists.

---

# Phase 3 — Curriculum Engine

**Duration:** Week 4–6

## Objective

Implement the core learning engine.

## Features

### Academy

* Levels
* Modules
* Sessions
* Steps

### Unlock Logic

* Sequential progression
* Locked content
* Resume learning

### Schema Rendering

Render curriculum dynamically from structured data.

## Deliverables

* Curriculum Loader
* Progress Engine
* Unlock Engine

## Exit Criteria

* Learner can navigate curriculum.
* Locked content behaves correctly.

---

# Phase 4 — Session Player

**Duration:** Week 7–9

## Objective

Deliver the instructional experience.

## Features

### Session Overview

### Learning Objectives

### Theory

### Coach Notes

### Visual Content

### Training Prescription

### Reflection

### Autosave

### Resume Session

## Step Engine

Support all Step types.

## Exit Criteria

* Complete session flow works end-to-end.
* Autosave functions reliably.

---

# Phase 5 — Assessment Engine

**Duration:** Week 10–11

## Objective

Implement mastery-based progression.

## Features

### Performance Entry

* Best Lap
* Average Lap
* Clean Laps
* Notes

### Mastery Evaluation

### Session Results

### Adaptive Remediation

### Module Examination

## Exit Criteria

* Assessment evaluates correctly.
* Remediation is generated.
* Progression rules enforced.

---

# Phase 6 — Dashboard & Progress

**Duration:** Week 12

## Objective

Create the learner's daily academy experience.

## Features

### Dashboard

* Today's Training
* Instructor Feedback
* Academy Progress
* Recent Activity

### Progress

* Levels
* Modules
* Sessions

### Analytics

* Practice Hours
* Completion Rate
* Mastery Rate

## Exit Criteria

* Dashboard becomes learner's primary entry point.

---

# Phase 7 — Certification System

**Duration:** Week 13

## Objective

Recognize learner achievements.

## Features

### Beginner Certification

### Certificate Generation

### Academy Record

### Graduation Flow

## Exit Criteria

* Learner can complete Beginner level.
* Certificate generated successfully.

---

# Phase 8 — MVP Polish

**Duration:** Week 14–15

## UX Improvements

* Empty States
* Loading States
* Error States
* Responsive Design

## Performance

* Lazy Loading
* Image Optimization
* Code Splitting
* Database Optimization

## Accessibility

* Keyboard Navigation
* Screen Readers
* Contrast Improvements

## Exit Criteria

* No critical usability issues remain.

---

# Phase 9 — Closed Beta

**Duration:** Week 16

## Participants

20–30 beginner sim racers.

## Goals

Validate:

* Curriculum clarity
* Session duration
* Assessment difficulty
* Learning effectiveness
* UI usability

## Metrics

* Session completion rate
* Beginner certification rate
* Average remediation count
* User satisfaction

---

# Phase 10 — Public Launch

## Launch Checklist

### Engineering

* Production deployment
* Monitoring
* Error tracking
* Database backup
* Security review

### Product

* Beginner curriculum complete
* Dashboard complete
* Assessments complete
* Certifications complete

### Documentation

* User Guide
* FAQ
* Release Notes
* Privacy Policy
* Terms of Service

---

# Post-MVP Roadmap

## Version 1.1

### Curriculum Improvements

* Additional Beginner drills
* Richer coaching notes
* Better analytics
* Session bookmarking
* Improved progress visualizations

---

## Version 1.2

### Learning Experience

* Interactive diagrams
* Corner visualizations
* Better onboarding
* Printable training logs

---

## Version 2.0 — Intermediate Academy

### New Curriculum

* Multiple tracks
* Multiple cars
* Racecraft
* Overtaking
* Defensive driving
* Tire management
* Fuel strategy
* Weather adaptation

---

## Version 3.0 — Expert Academy

### Advanced Driver Development

* Telemetry interpretation
* Suspension tuning
* Differential tuning
* Gear ratios
* Aero setup
* Tire pressure optimization
* Race strategy
* Qualifying optimization

---

## Version 4.0 — Simulator Expansion

Support additional platforms while retaining the same instructional architecture.

Potential simulators:

* Assetto Corsa
* Assetto Corsa Competizione
* iRacing
* Gran Turismo
* EA Sports F1

---

# Technical Debt Policy

Technical debt is acceptable only when:

* It accelerates MVP delivery.
* It does not compromise curriculum integrity.
* It has a documented resolution plan.

Technical debt is unacceptable when it:

* Breaks progression logic.
* Weakens assessment reliability.
* Introduces inconsistent instructional behavior.

---

# Definition of Done (DoD)

A feature is considered complete only when it satisfies all of the following:

## Product

* Meets PRD requirements.
* Supports the curriculum philosophy.
* Has defined acceptance criteria.

## Engineering

* Code reviewed.
* Unit tests pass.
* Integration tests pass.
* No critical defects.

## UX

* Responsive.
* Accessible.
* Consistent with the design system.

## Documentation

* Technical documentation updated.
* User-facing documentation updated if applicable.

---

# Suggested Team Structure

For the MVP, a lean team is sufficient:

| Role                | Responsibility                       |
| ------------------- | ------------------------------------ |
| Product Owner       | Vision, curriculum, priorities       |
| Technical Lead      | Architecture and code quality        |
| Frontend Developer  | React UI and session player          |
| Backend Developer   | Supabase, APIs, business logic       |
| UI/UX Designer      | Design system and learner experience |
| Curriculum Designer | Lesson content, drills, assessments  |
| QA Engineer         | Functional and curriculum validation |

*In a solo-founder scenario, the Product Owner, Curriculum Designer, and QA responsibilities can initially be handled by the founder.*

---

# Success Criteria

The MVP is successful when a complete beginner can:

1. Create an account.
2. Complete the onboarding.
3. Receive a prescribed training session.
4. Practice using the prescribed configuration.
5. Submit performance manually.
6. Receive objective assessment.
7. Complete remediation if required.
8. Pass module examinations.
9. Earn the Beginner Driver Certification.

At that point, APEX has achieved its core promise:

> **Transforming complete beginners into disciplined, consistent sim racers through a structured, curriculum-driven learning experience.**
