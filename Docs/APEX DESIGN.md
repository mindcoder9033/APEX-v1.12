# APEX Design System (DESIGN.md)

**Document Version:** 1.0
**Product:** APEX
**Document Type:** Design System Specification
**Status:** Draft

---

# Part 1 — Design Philosophy & Foundations

---

# 1. Purpose

The APEX Design System defines the visual language, interaction principles, component architecture, and user experience standards for the APEX platform.

It exists to ensure every screen, interaction, and component communicates the same experience:

> **A professional racing academy delivered through software.**

The design system is not simply a UI guideline.

It is the visual expression of the APEX educational philosophy.

Every design decision must reinforce structured learning, deliberate practice, and mastery-based progression.

---

# 2. Design Vision

APEX should become the benchmark for curriculum-driven educational software in sim racing.

When a learner opens APEX they should immediately feel that they have entered:

* a professional academy,
* a structured learning environment,
* a disciplined coaching program,
* and an engineering-driven training platform.

The interface should inspire confidence through clarity rather than excitement through decoration.

---

# 3. Core Design Principles

Every future screen, component and feature must satisfy these principles.

---

## Principle 1

### Curriculum Before Interface

The curriculum is the product.

The interface exists only to deliver it.

Users should remember what they learned.

Not how impressive the interface looked.

---

## Principle 2

### Function Before Decoration

Every visual element must have a purpose.

Every icon must communicate.

Every colour must indicate state.

Every animation must explain change.

Decorative elements should never compete with educational content.

---

## Principle 3

### One Screen. One Objective.

Every screen should answer one primary question.

| Screen     | Primary Question                  |
| ---------- | --------------------------------- |
| Dashboard  | What should I train today?        |
| Curriculum | Where am I in my academy journey? |
| Session    | What am I learning right now?     |
| Assessment | Have I demonstrated mastery?      |
| Progress   | How am I improving?               |
| Profile    | Who am I as a learner?            |

Secondary information should never distract from the primary objective.

---

## Principle 4

### Calm Interfaces Create Better Learning

Learning requires concentration.

The interface should reduce cognitive load.

Avoid:

* unnecessary colours
* decorative animations
* competing calls-to-action
* excessive statistics
* visual clutter

The application should feel calm even when the learner makes mistakes.

---

## Principle 5

### Professional Over Playful

APEX is not a game.

It is a driver academy.

Avoid interfaces that resemble:

* mobile games
* esports dashboards
* social media
* entertainment platforms

Instead, draw inspiration from:

* engineering software
* flight schools
* driver development programmes
* professional motorsport operations

---

## Principle 6

### Consistency Builds Confidence

Components should behave identically throughout the application.

Buttons should always look familiar.

Cards should always behave predictably.

Navigation should always remain understandable.

Consistency reduces mental effort.

---

## Principle 7

### Everything Teaches

Every screen should reinforce learning.

Even empty states, validation messages and assessment feedback should contribute to education.

---

# 4. Product Personality

The APEX interface should communicate the following characteristics.

## Professional

The learner should feel they are attending a serious academy.

---

## Disciplined

Progress is earned.

Nothing is unlocked through arbitrary engagement.

---

## Calm

The interface should never feel stressful.

Complexity belongs in the curriculum—not the interface.

---

## Precise

Alignment, spacing and typography should reflect engineering precision.

---

## Confident

The application should never apologise for its instructional standards.

It should calmly communicate expectations.

---

## Objective

Feedback should be factual.

Not emotional.

Not judgmental.

---

# 5. Brand Positioning

APEX occupies a unique position between education software and engineering software.

It is neither.

It combines both.

---

## Educational Inspiration

* Professional driving schools
* Flight academies
* Technical training centres
* Engineering education

---

## Engineering Inspiration

* Formula 1 garages
* Bosch Motorsport
* McLaren Applied
* Siemens engineering software
* Professional telemetry tools

---

## Explicitly Not Inspired By

* Duolingo
* Steam
* Discord
* Twitch
* TikTok
* Mobile games
* Racing game menus

---

# 6. Design Statement

The entire product can be summarised with one sentence:

> **Professional driver education powered by industrial-grade interface design.**

---

# 7. Visual Identity

## Theme

Dark Mode Only.

The visual environment should resemble professional engineering workstations used in motorsport.

---

## Colour Philosophy

Colours communicate meaning.

Never decoration.

Accent colours indicate:

* Information
* Success
* Warning
* Error
* Active focus

Colour should never be used merely because empty space exists.

---

## Material Philosophy

Surfaces should appear:

* matte
* refined
* engineered
* precise

Avoid glossy effects.

Avoid glassmorphism.

Avoid decorative gradients.

The application should resemble machined equipment rather than polished marketing material.

---

# 8. Visual Language

The APEX visual language is defined as:

## Industrial Engineering

Characteristics:

* precise geometry
* disciplined spacing
* restrained colour usage
* subtle borders
* minimal shadows
* strong hierarchy
* structured layouts

The learner should feel surrounded by professional equipment rather than consumer software.

---

# 9. Design Keywords

Every design decision should reinforce these words.

Primary

* Professional
* Precise
* Disciplined
* Structured
* Technical
* Calm

Secondary

* Modern
* Minimal
* Confident
* Purposeful
* Engineered
* Educational

Avoid

* Playful
* Flashy
* Loud
* Neon
* Cartoonish
* Decorative
* Gamified

---

# 10. User Experience Philosophy

Every learner interaction should follow the same pattern.

```text
Understand

↓

Practice

↓

Reflect

↓

Improve

↓

Master
```

The interface should naturally guide the learner through this journey.

---

# 11. Information Hierarchy

The interface should always present information in this order.

1. Current objective
2. Current learning activity
3. Coach guidance
4. Training prescription
5. Progress
6. Historical performance
7. Supporting analytics

Historical information should never compete with today's learning objective.

---

# 12. Educational Design Philosophy

APEX teaches through structure.

Therefore the interface must also be structured.

Every lesson should feel predictable.

Every assessment should feel fair.

Every remediation should feel logical.

Predictability builds trust.

Trust enables learning.

---

# 13. Design Manifesto

> Great educational interfaces disappear.

They do not compete with the curriculum.

They do not attempt to entertain.

They quietly organise information.

They guide attention.

They remove friction.

They reduce cognitive load.

APEX is not designed to impress the learner.

It is designed to improve the learner.

Every pixel has purpose.

Every interaction reinforces discipline.

Every screen supports mastery.

The learner should never remember the interface.

They should remember how much better they became.

---

**End of DESIGN.md — Part 1**

**Next:** **Part 2 — Brand System, Color System, Typography, Spacing, Precision Geometry & Design Tokens**

# APEX Design System (DESIGN.md)

# Part 2 — Foundation System

---

# 14. Foundation Philosophy

The Foundation System defines the immutable visual rules of APEX.

Every screen.

Every component.

Every interaction.

Every future feature.

must inherit from these foundations.

No page may introduce its own colours, spacing, typography, radius or animation values.

Consistency is achieved through shared foundations rather than duplicated styling.

---

# 15. Foundation Layers

The APEX Design System consists of four layers.

```text
Foundation

↓

Layout

↓

Components

↓

Pages
```

Each layer builds upon the previous one.

Only the Foundation Layer contains design tokens.

Everything else consumes those tokens.

---

# 16. Theme System

## Supported Themes

Dark Theme

Only.

APEX intentionally supports a single visual environment.

Reasons:

* Complete visual consistency
* Engineering workstation aesthetic
* Reduced maintenance
* Stronger brand recognition
* Curriculum-first experience

Future themes are outside the MVP scope.

---

# 17. Colour Philosophy

Colour communicates meaning.

Never decoration.

Every colour must answer one question:

> What information is this communicating?

If the answer is "nothing",

remove the colour.

---

# 18. Colour Hierarchy

Colours are divided into four categories.

## Category 1

Neutral Colours

Purpose

Application structure.

Examples

* Background
* Cards
* Panels
* Borders
* Typography

These colours occupy approximately 90% of the interface.

---

## Category 2

Functional Colours

Purpose

Interactive elements.

Examples

* Buttons
* Links
* Active navigation
* Current session

---

## Category 3

Semantic Colours

Purpose

Communicate state.

Examples

* Success
* Warning
* Error
* Information

---

## Category 4

Performance Colours

Reserved exclusively for motorsport performance.

Examples

* Mastery
* Consistency
* Improvement
* Session status

These colours should never appear outside educational or performance contexts.

---

# 19. Surface System

The interface should resemble stacked engineering panels.

Surface elevation is communicated through brightness rather than shadow.

Surface hierarchy:

```text
Surface 0

Application Background

↓

Surface 1

Navigation

Coach Console

↓

Surface 2

Cards

↓

Surface 3

Interactive Controls

↓

Surface 4

Dialogs
```

Every increase in elevation should produce a subtle increase in brightness.

Never dramatic shadows.

---

# 20. Colour Palette

## Neutral Foundation

Primary Background

Matte Charcoal

Secondary Background

Graphite

Primary Surface

Dark Steel

Secondary Surface

Slate

Border

Low Contrast Gray

Primary Text

Off White

Secondary Text

Cool Gray

Disabled Text

Muted Gray

---

## Functional Colours

Primary Action

Academy Blue

Secondary Action

Steel Gray

Ghost

Transparent

Danger

Engineering Red

---

## Semantic Colours

Information

Blue

Success

Green

Warning

Amber

Error

Red

Neutral

Gray

These colours must remain consistent across every screen.

---

# 21. Colour Usage Rules

Never use colour for decoration.

Never use more than one primary accent on a single screen.

Primary buttons always use Primary Action colour.

Danger actions always use Error colour.

Status indicators always use Semantic colours.

Charts should minimise colour usage.

Typography should communicate hierarchy before colour does.

---

# 22. Material System

APEX follows an Industrial Engineering material philosophy.

Visual characteristics:

* Matte
* Refined
* Low reflectivity
* Precision surfaces
* Minimal gradients
* Strong panel separation

Avoid:

* Glassmorphism
* Heavy blur
* Gloss
* Plastic appearance
* Decorative lighting
* Chrome effects

---

# 23. Typography System

Typography is separated into two families.

## UI Typography

Typeface

Inter

Used for:

* Navigation
* Buttons
* Tables
* Forms
* Cards
* Analytics
* Labels
* Badges

Reason

Maximum interface readability.

---

## Learning Typography

Typeface

IBM Plex Sans

Used for:

* Session theory
* Coach notes
* Learning objectives
* Exercises
* Assessments
* Reflections
* Educational content

Reason

Improves readability for extended instructional content while reinforcing the feeling of a technical training manual.

---

# 24. Typography Scale

The typography scale should remain consistent across the application.

| Style      | Usage                  |
| ---------- | ---------------------- |
| Display    | Landing titles         |
| H1         | Page title             |
| H2         | Section title          |
| H3         | Card title             |
| H4         | Component heading      |
| Body Large | Learning content       |
| Body       | Standard text          |
| Small      | Supporting information |
| Caption    | Metadata               |
| Label      | Inputs and forms       |
| Button     | Interactive controls   |

Typography hierarchy should be created through size and weight before introducing colour.

---

# 25. Typography Rules

Maximum font families:

Two

Maximum font weights:

Four

Avoid excessive bold text.

Avoid italics except where pedagogically meaningful.

Avoid fully capitalised paragraphs.

Maintain comfortable line spacing for educational content.

Learning content should prioritise readability over density.

---

# 26. Spacing Philosophy

Whitespace is an instructional tool.

Generous spacing reduces cognitive load.

Compact spacing is reserved for analytics and engineering data.

Spacing communicates hierarchy.

Not emptiness.

---

# 27. Spacing Scale

Base Unit

8 px

Scale

```text
4

8

16

24

32

40

48

64

80

96
```

Every layout, component and screen must use this scale.

Arbitrary spacing values are prohibited.

---

# 28. Grid System

Desktop-first.

12-column responsive grid.

Maximum content width:

1440 px

Content alignment follows strict vertical rhythm.

No arbitrary alignment.

Every major element aligns to the grid.

---

# 29. Precision Geometry

Geometry communicates engineering quality.

Corner Radius System

| Component     | Radius |
| ------------- | ------ |
| Buttons       | 8 px   |
| Inputs        | 8 px   |
| Dropdowns     | 8 px   |
| Cards         | 12 px  |
| Coach Console | 12 px  |
| Panels        | 12 px  |
| Modals        | 16 px  |
| Images        | 12 px  |
| Chips         | Pill   |
| Badges        | Pill   |

Avoid exaggerated rounding.

Avoid perfectly square components except where function demands.

---

# 30. Border System

Borders define surfaces.

Not shadows.

Border Types

Primary

1 px

Secondary

Subtle

Active

Primary Accent

Success

Green

Warning

Amber

Error

Red

Borders should always remain understated.

---

# 31. Shadow System

Shadows are used sparingly.

Three levels only.

Level 1

Cards

Level 2

Dropdowns

Level 3

Dialogs

Large dramatic shadows are prohibited.

Brightness should communicate elevation before shadows do.

---

# 32. Icon System

Icon Library

Lucide Icons

Characteristics

* Geometric
* Lightweight
* Consistent stroke width
* Engineering aesthetic
* Minimal visual noise

Icons support text.

They should rarely replace text.

Every icon must improve recognition.

Not decoration.

---

# 33. Illustration Philosophy

Illustrations should educate.

Not decorate.

Preferred content:

* Track diagrams
* Racing lines
* Vehicle dynamics
* Weight transfer
* Brake zones
* Apex markers
* Corner phases
* Driving techniques

Avoid decorative artwork.

Every illustration should teach something.

---

# 34. Imagery

Photography should be used sparingly.

When used, imagery should depict:

* Professional motorsport
* Driver training
* Vehicle dynamics
* Track environments
* Engineering detail

Avoid:

* Lifestyle imagery
* Generic stock photography
* Esports aesthetics
* Marketing hero images

The curriculum remains the visual focus.

---

# 35. Foundation QA Checklist

Every visual decision should satisfy the following questions:

* Does it improve learning?
* Does it reduce cognitive load?
* Does it reinforce professionalism?
* Does it align with Industrial Engineering?
* Does it follow the spacing scale?
* Does it use approved colours?
* Does it inherit design tokens?
* Does it avoid decoration?
* Does it strengthen the APEX identity?

If any answer is **No**, the design should be revised before implementation.

---

# End of DESIGN.md — Part 2

**Next:** **Part 3 — Layout System, Navigation, Engineering Workstation, Dashboard Architecture, Coach Console, Responsive Behaviour & Information Architecture**
# APEX Design System (DESIGN.md)

# Part 3 — Layout System & Information Architecture

---

# 36. Layout Philosophy

The layout system is designed around one principle:

> **The learner should always know where they are, what they are learning, and what they should do next.**

Unlike conventional learning platforms, APEX never leaves the learner wondering what action to take.

Every screen should naturally guide attention toward the current learning objective.

---

# 37. Engineering Workstation

The APEX application is built around the concept of an Engineering Workstation.

Instead of displaying disconnected pages, every screen behaves like a professional driver development environment.

Standard desktop layout:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Application Header                                                           │
├──────────────┬──────────────────────────────────────────────┬────────────────┤
│ Sidebar      │ Main Workspace                               │ Coach Console  │
│              │                                              │                │
│ Navigation   │ Current Page                                │ Live Context   │
│              │                                              │                │
└──────────────┴──────────────────────────────────────────────┴────────────────┘
```

Each area has a dedicated responsibility.

---

# 38. Workspace Hierarchy

The application is divided into three persistent regions.

## Navigation

Purpose:

Application movement.

Contains:

* Dashboard
* Curriculum
* Progress
* Profile
* Settings

Navigation never contains learning content.

---

## Main Workspace

Purpose:

Primary learning area.

Contains:

* Theory
* Exercises
* Assessments
* Progress
* Analytics
* Settings

The Main Workspace always receives visual priority.

---

## Coach Console

Purpose:

Provide continuous coaching context.

Unlike pop-ups or notifications, the Coach Console remains persistent throughout the learner's journey.

It behaves like a professional instructor sitting beside the learner.

---

# 39. Adaptive Sidebar

The sidebar changes depending on user context.

---

## Learning Mode

Collapsed.

Only icons remain visible.

This maximises the available learning space.

---

## Application Mode

Expanded.

Icons and labels appear.

Used for:

* Dashboard
* Curriculum
* Progress
* Profile
* Settings

The learner spends more time navigating in these areas.

---

## Sidebar Behaviour

Expand

Smooth horizontal transition.

Collapse

Smooth horizontal transition.

No abrupt layout shifts.

---

# 40. Application Header

The header provides orientation.

It never becomes cluttered.

Standard content:

Left

Current page title

Centre

Current Level

↓

Current Module

↓

Current Session

Right

Notifications

Profile

Settings

Session Status (when applicable)

---

# 41. Main Workspace

The Main Workspace is where learning happens.

Its layout changes according to the active page.

Examples:

Dashboard

Hero-driven

Curriculum

Hierarchical

Session

Instructional

Assessment

Question-driven

Progress

Analytical

The Main Workspace should never contain persistent navigation.

Navigation belongs elsewhere.

---

# 42. Coach Console

The Coach Console is a defining feature of APEX.

Unlike a traditional sidebar, it is context-aware.

Its content changes depending on the learner's activity.

---

## Dashboard

Displays:

Today's Objective

Recommended Session

Coach Message

Current Competency

Training Status

---

## Session

Displays:

Current Learning Objective

Training Prescription

Session Progress

Mastery Criteria

Coach Notes

Estimated Time Remaining

---

## Assessment

Displays:

Assessment Rules

Completion Status

Current Score

Attempt Information

Remaining Questions

---

## Progress

Displays:

Current Level

Completed Modules

Consistency Trend

Recent Improvements

Next Milestone

---

The Coach Console should never duplicate information already occupying the Main Workspace.

It complements.

It does not repeat.

---

# 43. Dashboard Architecture

The Dashboard is the learner's home.

It answers one question:

> **What should I do today?**

---

## Layout

```text
Today's Training

↓

Coach Briefing

↓

Current Progress

↓

Recent Activity

↓

Academy Statistics
```

The learner should be able to begin training within seconds of opening the application.

---

## Dashboard Components

Primary Hero

Today's Training

Secondary

Coach Briefing

Progress Summary

Recent Sessions

Practice Streak

Current Certification Progress

Future enhancements may introduce recommendations and adaptive insights without changing the core structure.

---

# 44. Curriculum Architecture

Curriculum is presented as a structured hierarchy.

```text
Level

↓

Module

↓

Session
```

Each level expands progressively.

Locked modules remain visible.

Visibility motivates progression.

Hidden content does not.

---

# 45. Session Architecture

Sessions are the heart of APEX.

Every session follows the same structure.

```text
Overview

↓

Learning Objective

↓

Theory

↓

Coach Notes

↓

Training Prescription

↓

Exercise

↓

Reflection

↓

Assessment

↓

Summary
```

Learners should recognise this pattern after completing only a few sessions.

Consistency reduces cognitive effort.

---

# 46. Assessment Architecture

Assessments prioritise clarity.

Each assessment contains:

Instructions

↓

Question

↓

Answer Area

↓

Feedback

↓

Next Question

The learner should focus entirely on demonstrating understanding.

No unnecessary interface elements should compete for attention.

---

# 47. Progress Architecture

Progress should communicate growth.

Not entertainment.

Information hierarchy:

Current Level

↓

Completed Modules

↓

Current Competency

↓

Consistency

↓

Historical Improvement

↓

Achievements

Charts should support reflection rather than encourage comparison.

---

# 48. Profile Architecture

The Profile screen represents the learner's academy record.

Contains:

Personal Information

Learning Statistics

Completed Certifications

Training History

Preferences

Profile information should remain factual.

No social features are included in the MVP.

---

# 49. Empty States

Every empty state should educate.

Example:

Instead of:

"No sessions completed."

Use:

"You haven't completed any training sessions yet. Begin your first session to start building the foundations of consistent driving."

Every empty state should include one clear primary action.

---

# 50. Navigation Rules

Navigation should always satisfy three principles.

### Principle 1

Learners always know where they are.

---

### Principle 2

Learners always know how to return.

---

### Principle 3

Learners never lose session progress because of navigation.

---

# 51. Page Width Guidelines

Different pages require different reading widths.

| Page Type      | Preferred Width        |
| -------------- | ---------------------- |
| Dashboard      | Wide                   |
| Curriculum     | Medium                 |
| Session Theory | Narrow for readability |
| Assessment     | Medium                 |
| Progress       | Wide                   |
| Settings       | Narrow                 |

Learning content should prioritise reading comfort over filling available screen space.

---

# 52. Responsive Behaviour

APEX is desktop-first.

Responsive behaviour should preserve the learning experience rather than simply resize elements.

Desktop

Full Engineering Workstation.

Tablet

Coach Console collapses into a slide-out panel.

Sidebar remains adaptive.

Mobile

Limited support for MVP.

Content becomes single-column.

Complex analytics may be simplified.

Primary learning workflows should remain usable, but desktop remains the recommended experience.

---

# 53. Layout Quality Standards

Every page should pass the following checks:

* Does the page have one clear objective?
* Is the primary action immediately visible?
* Is navigation predictable?
* Is the Coach Console relevant to the current context?
* Does the Main Workspace remain the visual focus?
* Is unnecessary information removed?
* Does the layout reduce cognitive load?
* Can the learner understand the page within five seconds?

If any answer is **No**, the layout should be revised before implementation.

---

# End of DESIGN.md — Part 3

**Next:** **Part 4 — Component System, Foundation Components, Academy Components, Motorsport Components & Interaction Patterns**
# APEX Design System (DESIGN.md)

# Part 4 — Component System & Interaction Patterns

---

# 54. Component Philosophy

Components are the building blocks of APEX.

Pages should never be designed individually.

Instead, pages are assembled from reusable components that follow consistent behaviour, spacing, typography, interaction patterns and accessibility standards.

Every component should answer three questions:

* What problem does this component solve?
* When should it be used?
* How should it behave?

If a component cannot answer those questions, it should not exist.

---

# 55. Component Architecture

The APEX Design System consists of three component layers.

```text
Foundation Components

↓

Academy Components

↓

Motorsport Components
```

Each layer builds upon the previous one.

---

# 56. Layer 1 — Foundation Components

Foundation Components contain no curriculum or motorsport knowledge.

They provide generic user interface primitives.

## Available Components

Buttons

Icon Buttons

Inputs

Text Areas

Dropdowns

Checkboxes

Radio Groups

Switches

Badges

Chips

Cards

Tabs

Accordions

Dialogs

Tooltips

Breadcrumbs

Progress Bars

Tables

Skeleton Loaders

Empty States

Toasts

These components should remain reusable across the entire application.

---

# 57. Foundation Component Principles

Foundation Components should:

* remain visually consistent
* support keyboard navigation
* support accessibility
* inherit design tokens
* avoid business logic
* remain reusable

Business rules belong to higher component layers.

---

# 58. Button System

Buttons communicate available actions.

Button hierarchy:

Primary

Used only once per screen.

Examples:

* Start Session
* Submit Assessment
* Begin Module

---

Secondary

Supporting actions.

Examples:

* Save
* Continue
* Review

---

Ghost

Low emphasis actions.

Examples:

* Cancel
* Back
* View Details

---

Danger

Reserved for destructive actions.

Examples:

* Reset Progress
* Delete Entry

---

Rules

Only one Primary Button should exist within a single visual context.

---

# 59. Card System

Cards are the primary content container throughout APEX.

Cards should:

* communicate one purpose
* contain generous spacing
* avoid nested layouts
* minimise visual noise

Card Types

Information

Learning

Exercise

Assessment

Progress

Configuration

Analytics

Feedback

Cards should not become miniature pages.

---

# 60. Form Components

Forms should prioritise clarity.

Guidelines

Labels always appear above inputs.

Required fields are clearly indicated.

Validation messages appear directly beneath the field.

Placeholder text should never replace labels.

Error messages should explain:

* what happened
* why
* how to correct it

---

# 61. Data Presentation

APEX uses three methods for displaying information.

Cards

Preferred.

Tables

Used only where comparison is necessary.

Lists

Used for sequential information.

Avoid unnecessary dashboards filled with charts.

---

# 62. Layer 2 — Academy Components

Academy Components understand curriculum.

These components represent educational concepts rather than generic UI.

---

## Learning Objective

Purpose

Explain what the learner should achieve.

Contains

* Objective
* Expected Outcome
* Estimated Time

Appears at the beginning of every session.

---

## Theory Block

Purpose

Present instructional content.

Contains

* Heading
* Explanation
* Supporting diagrams
* Key concepts

Theory Blocks prioritise readability.

---

## Coach Note

Purpose

Provide contextual guidance.

Appears:

* before drills
* after mistakes
* before assessments
* during remediation

Coach Notes should remain concise and instructional.

---

## Drill Card

Purpose

Present practical driving exercises.

Contains

* Objective
* Instructions
* Success Criteria
* Common Mistakes

Drill Cards should focus on one skill only.

---

## Reflection Block

Purpose

Encourage deliberate reflection.

Contains

* Guided questions
* Personal observations
* Self-assessment

Reflection should remain objective.

---

## Knowledge Check

Purpose

Verify understanding before progressing.

Question formats:

* Multiple Choice
* True / False
* Short Answer

Immediate feedback should explain reasoning.

---

## Assessment Summary

Purpose

Summarise learner performance.

Displays:

* Mastery Status
* Areas of Strength
* Areas for Improvement
* Recommended Next Step

---

## Module Overview

Purpose

Introduce a module.

Contains

* Learning Outcomes
* Sessions
* Skills Covered
* Module Assessment

---

## Session Timeline

Displays the learner's current position.

Example

```text
Overview

↓

Theory

↓

Practice

↓

Reflection

↓

Assessment

↓

Complete
```

The Session Timeline remains visible throughout the session.

---

# 63. Layer 3 — Motorsport Components

Motorsport Components understand racing concepts.

They distinguish APEX from a generic learning platform.

---

## Coach Console

Purpose

Provide continuous coaching context.

Displays:

* Current Objective
* Session Progress
* Coach Guidance
* Mastery Criteria
* Training Prescription

The Coach Console updates dynamically as the learner progresses.

---

## Training Prescription

Purpose

Display the required practice configuration.

Contains

Track

Car

Transmission

Driving Assists

Weather

Tyres

Fuel

Session Type

Practice Duration

The learner should never guess how to configure practice.

---

## Car Configuration

Displays:

* Car
* Class
* Drivetrain
* Recommended Setup
* Prescribed Assists

This is informational only during the MVP.

---

## Track Information

Displays:

* Track
* Layout
* Session Conditions
* Recommended Focus

Future versions may include track maps and reference sectors.

---

## Mastery Indicator

Communicates current competency.

Possible states:

Not Started

In Progress

Mastered

Remediation Required

Locked

Each state uses consistent semantic colours and icons.

---

## Performance Summary

Displays learner-entered performance data.

Examples:

Best Lap

Average Lap

Clean Laps

Off-Track Incidents

Spins

Session Duration

The MVP relies entirely on manually entered values.

---

## Practice Log

Displays historical practice sessions.

Contains:

Date

Track

Car

Module

Session

Performance Summary

Coach Outcome

---

## Driving Checklist

Appears before practical exercises.

Examples

✓ Correct Track

✓ Correct Car

✓ Driving Assists Confirmed

✓ Weather Confirmed

✓ Ready to Begin

The checklist reinforces disciplined preparation.

---

# 64. Interaction Patterns

Interaction should feel calm, predictable and deliberate.

---

## Primary Flow

Every major learning interaction follows:

```text
Read

↓

Understand

↓

Practice

↓

Reflect

↓

Assess

↓

Progress
```

The learner should never skip essential steps.

---

## Progressive Disclosure

Only reveal information when it becomes relevant.

Avoid overwhelming the learner with unnecessary detail.

Examples:

Assessment feedback appears only after submission.

Remediation appears only when mastery is not achieved.

Future modules remain visible but locked.

---

## Confirmation Patterns

Confirmation is required only for actions that may result in data loss.

Examples:

Reset Progress

Delete Session Entry

Restart Assessment

Routine actions should not require confirmation.

---

## Feedback Patterns

Every user action receives immediate feedback.

Examples:

Session Saved

Assessment Submitted

Progress Updated

Feedback should be brief, factual and non-disruptive.

---

## Error Handling

Errors should answer three questions:

What happened?

Why did it happen?

How can the learner recover?

Never blame the learner.

Avoid technical jargon.

---

## Loading Behaviour

Loading should preserve layout stability.

Preferred methods:

* Skeleton loaders
* Progressive content loading

Avoid:

* blank screens
* excessive spinners
* layout shifts

---

# 65. Component Naming Convention

Every component follows a consistent naming pattern.

Foundation

Button

Card

Input

Academy

LearningObjective

TheoryBlock

CoachNote

DrillCard

ReflectionBlock

SessionTimeline

Motorsport

CoachConsole

TrainingPrescription

MasteryIndicator

PerformanceSummary

PracticeLog

Names should be descriptive, consistent and aligned with the curriculum.

---

# 66. Component Quality Standards

Every reusable component must satisfy the following checklist.

### Purpose

Does the component solve one clear problem?

### Reusability

Can it be used in multiple contexts?

### Consistency

Does it inherit the APEX design system?

### Accessibility

Is it fully keyboard accessible?

Does it expose appropriate labels and focus states?

### Educational Value

Does it support the learner's progress?

### Maintainability

Can the component evolve without breaking other screens?

If any answer is **No**, the component should be redesigned before implementation.

---

# End of DESIGN.md — Part 4

**Next:** **Part 5 — Motion System, Accessibility, Responsive Design, Page Templates, Design Governance & Future Evolution**
# APEX Design System (DESIGN.md)

# Part 5 — Motion, Accessibility, Quality Standards & Design Governance

---

# 67. Motion Philosophy

Motion in APEX exists for one reason:

> **To communicate interface state.**

Motion is never decorative.

It should never compete with learning.

Every animation should feel deliberate, predictable and engineered.

---

# 68. Engineering Motion

The APEX motion system is inspired by precision mechanical systems rather than consumer applications.

Characteristics:

* Controlled
* Linear
* Predictable
* Functional
* Calm

Motion should reinforce confidence.

Not excitement.

---

# 69. Motion Principles

## Principle 1

Motion Explains

Animation should explain:

* where content came from
* where it is going
* what changed

---

## Principle 2

Motion Never Surprises

Users should always predict the result of an interaction.

Unexpected movement increases cognitive load.

---

## Principle 3

Motion Respects Learning

Educational content should never be interrupted by unnecessary animation.

Learning always takes priority.

---

## Principle 4

Motion is Temporary

Animations should complete quickly.

Content should remain visible longer than it moves.

---

# 70. Approved Motion Patterns

## Navigation

Sidebar

Smooth horizontal expansion and collapse.

---

## Page Transition

Subtle fade.

No dramatic movement.

---

## Cards

Fade

*

Small vertical translation

Cards should appear organised rather than animated.

---

## Dialogs

Scale gently from 98% to 100%.

Opacity increases simultaneously.

---

## Accordions

Expand vertically.

No bounce.

---

## Progress Bars

Linear progression only.

Never overshoot.

---

## Coach Console

Updates using subtle fade transitions.

The learner should notice new information without losing focus.

---

## Assessment Feedback

Reveal progressively.

The learner's attention should move naturally from result to explanation.

---

# 71. Prohibited Motion

The following animations are not permitted.

* Bounce
* Elastic effects
* Overshoot
* Flashing
* Infinite loops
* Parallax
* Floating objects
* Rotating icons
* Decorative particle systems
* Confetti
* Achievement explosions
* Animated backgrounds

These effects conflict with the Professional Racing Academy identity.

---

# 72. Sound Philosophy

The MVP contains no sound effects.

Reasons:

* Reduces distraction
* Supports long study sessions
* Encourages concentration
* Prevents notification fatigue

Future versions may introduce optional audio guidance.

Audio should never become mandatory.

---

# 73. Accessibility Philosophy

Accessibility is a core quality requirement.

Not an enhancement.

Every learner should be able to complete the curriculum regardless of their interaction method.

Accessibility decisions should be made during design rather than added during implementation.

---

# 74. Accessibility Standards

The design system targets WCAG AA compliance.

Requirements include:

* Keyboard navigation
* Visible focus indicators
* Semantic headings
* Sufficient colour contrast
* Accessible form labels
* Logical tab order
* Clear error messages
* Readable typography

Accessibility applies to every component.

---

# 75. Keyboard Navigation

Every primary workflow should be fully keyboard accessible.

Examples:

Navigation

Curriculum

Session

Assessment

Settings

Focus order should follow the visual hierarchy.

---

# 76. Colour Accessibility

Colour should never be the sole method of communicating information.

Every colour-based state must also include:

* icon
* label
* text
* or border change

Examples:

Success

Green

*

Check icon

*

"Mastered"

Warning

Amber

*

Alert icon

*

"Needs Practice"

---

# 77. Responsive Philosophy

APEX is designed desktop-first.

Desktop provides the complete Driver Development Environment.

Smaller devices should preserve functionality while simplifying layout.

---

# 78. Responsive Behaviour

## Desktop

Complete Engineering Workstation.

Adaptive Sidebar.

Persistent Coach Console.

---

## Tablet

Adaptive Sidebar.

Coach Console becomes collapsible.

Learning content remains prioritised.

---

## Mobile

Single-column layout.

Coach Console becomes a contextual drawer.

Analytics are simplified.

Complex workflows may require desktop.

The MVP is optimised for desktop usage.

---

# 79. Empty States

Every empty state should educate.

Examples:

No Practice Sessions

"You have not completed any practice sessions yet.

Begin Session 1 to establish your driving baseline."

No Progress

"Complete your first assessment to begin tracking improvement."

Every empty state should include one clear action.

---

# 80. Loading States

Loading should preserve page structure.

Preferred:

Skeleton loaders.

Avoid:

* empty pages
* layout jumping
* excessive loading indicators

The learner should always understand that content is loading intentionally.

---

# 81. Notifications

Notifications should remain minimal.

Notification Categories

Information

Success

Warning

Error

Notifications should disappear automatically unless user action is required.

Notifications should never interrupt learning.

---

# 82. Design Quality Checklist

Before approving any screen, verify:

### Purpose

Does the screen have one clear objective?

---

### Hierarchy

Is the primary action immediately obvious?

---

### Consistency

Does every component follow the design system?

---

### Accessibility

Can every interaction be completed using a keyboard?

Are colours sufficiently accessible?

---

### Educational Value

Does the screen improve learning?

---

### Simplicity

Has unnecessary information been removed?

---

### Performance

Does the interface remain lightweight and responsive?

---

### Engineering Identity

Does the screen feel like software used in a professional driver academy?

If any answer is **No**, the design should be revised before implementation.

---

# 83. Design Anti-Patterns

The following patterns are prohibited throughout APEX.

Visual

* Excessive gradients
* Neon colour palettes
* Decorative textures
* Heavy shadows
* Inconsistent spacing

Interaction

* Hidden navigation
* Unexpected pop-ups
* Multiple competing primary actions
* Infinite scrolling in learning content
* Auto-playing media

Educational

* Decorative gamification
* Random rewards
* Artificial engagement mechanics
* Curriculum shortcuts
* Unstructured progression

APEX rewards mastery.

Never engagement.

---

# 84. Design Governance

The Design System is the single source of truth for the APEX user interface.

New components must:

* solve a reusable problem
* inherit design tokens
* support accessibility
* align with the Professional Racing Academy philosophy
* avoid duplication

If an existing component can solve the problem, it should be reused rather than redesigned.

---

# 85. Versioning

The Design System should evolve alongside the product.

Suggested versioning:

* Version 1.x — Visual refinements and component additions
* Version 2.x — New learning experiences and advanced layouts
* Version 3.x — Major design language evolution

Breaking visual changes should be documented before implementation.

---

# 86. Future Evolution

The design system has been intentionally structured to support future capabilities without redesigning the core experience.

Potential future additions include:

* Telemetry visualisations
* AI Coach Console enhancements
* Replay analysis
* Setup comparison views
* Multi-monitor workstation layouts
* Triple-screen optimisation
* VR companion interfaces
* Team and instructor dashboards

These should extend the existing system rather than replace it.

---

# 87. Design Manifesto

APEX is not designed to entertain.

It is designed to develop disciplined drivers.

Every surface has purpose.

Every interaction reinforces structure.

Every animation communicates change.

Every component teaches.

Every page reduces cognitive load.

The learner should never fight the interface.

The interface should quietly guide them toward mastery.

When a learner completes the Beginner curriculum, they should not remember the colours, animations or layouts.

They should remember that they became a more consistent, more confident and more disciplined driver.

That is the measure of successful design.

---

# End of DESIGN.md

This document serves as the authoritative design specification for APEX. All future screens, components, interactions and visual decisions must conform to the principles, systems and standards defined herein. Any deviation should be reviewed against the core philosophy of **Professional Racing Academy**, **Industrial Engineering**, and **Curriculum-First Learning** before implementation.
