---
version: alpha
name: Tasklane
description: A calm, light task-management UI with one blue accent, soft neutral surfaces, a kanban board, a create form and a task detail page.
colors:
    primary: "#2B59D9"
    primary-strong: "#1F46B0"
    primary-soft: "#EAF0FD"
    on-primary: "#FFFFFF"
    background: "#F4F5F7"
    surface: "#FFFFFF"
    surface-sunken: "#EBEDF1"
    border: "#E3E6EB"
    border-strong: "#D5D9E0"
    ink: "#16181D"
    ink-muted: "#4A5160"
    ink-subtle: "#5B6270"
    status-todo: "#6B7280"
    status-progress: "#2B59D9"
    status-review: "#B7791F"
    status-done: "#15803D"
    prio-high: "#C2410C"
    prio-medium: "#B7791F"
    prio-low: "#6B7280"
    tag-design-bg: "#EAEEFD"
    tag-design-ink: "#2B3FA8"
    tag-dev-bg: "#E3F3EF"
    tag-dev-ink: "#0B5D4E"
    tag-research-bg: "#FFF1DC"
    tag-research-ink: "#8A4B00"
    tag-content-bg: "#FBE7F0"
    tag-content-ink: "#9D174D"
    tag-neutral-bg: "#ECEEF2"
    tag-neutral-ink: "#3F4654"
    track: "#E3E6EB"
    time-fill: "#0F766E"
    avatar-blue: "#2B59D9"
    avatar-teal: "#0F766E"
    avatar-berry: "#9D174D"
    avatar-violet: "#7C3AED"
    avatar-amber: "#B45309"
typography:
    page-title:
        fontFamily: Inter
        fontSize: 26px
        fontWeight: 700
        lineHeight: 32px
        letterSpacing: -0.02em
    task-title:
        fontFamily: Inter
        fontSize: 28px
        fontWeight: 700
        lineHeight: 36px
        letterSpacing: -0.02em
    section-title:
        fontFamily: Inter
        fontSize: 16px
        fontWeight: 600
        lineHeight: 24px
    card-title:
        fontFamily: Inter
        fontSize: 14px
        fontWeight: 600
        lineHeight: 20px
    body:
        fontFamily: Inter
        fontSize: 14px
        fontWeight: 400
        lineHeight: 22px
    body-strong:
        fontFamily: Inter
        fontSize: 14px
        fontWeight: 600
        lineHeight: 22px
    meta:
        fontFamily: Inter
        fontSize: 13px
        fontWeight: 500
        lineHeight: 20px
    caption:
        fontFamily: Inter
        fontSize: 12px
        fontWeight: 500
        lineHeight: 16px
    overline:
        fontFamily: Inter
        fontSize: 12px
        fontWeight: 600
        lineHeight: 16px
        letterSpacing: 0.04em
rounded:
    sm: 6px
    md: 8px
    lg: 10px
    xl: 14px
    full: 999px
spacing:
    xs: 4px
    sm: 8px
    md: 12px
    lg: 16px
    xl: 20px
    2xl: 24px
    3xl: 32px
components:
    button-primary:
        backgroundColor: "{colors.primary}"
        textColor: "{colors.on-primary}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.lg}"
        padding: 0 18px
        height: 44px
    button-secondary:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.lg}"
        padding: 0 18px
        height: 44px
    button-link:
        backgroundColor: "{colors.background}"
        textColor: "{colors.primary-strong}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.lg}"
        padding: 0 8px
        height: 44px
    nav-item:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink-muted}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.md}"
        padding: 9px 10px
    nav-item-active:
        backgroundColor: "{colors.primary-soft}"
        textColor: "{colors.primary-strong}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.md}"
        padding: 9px 10px
    input:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink}"
        typography: "{typography.body}"
        rounded: "{rounded.lg}"
        padding: 0 12px
        height: 44px
    choice-selected:
        backgroundColor: "{colors.primary-soft}"
        textColor: "{colors.primary-strong}"
        typography: "{typography.body-strong}"
        rounded: "{rounded.lg}"
        height: 44px
    panel:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink}"
        typography: "{typography.body}"
        rounded: "{rounded.xl}"
        padding: 24px
    column:
        backgroundColor: "{colors.surface-sunken}"
        textColor: "{colors.ink}"
        typography: "{typography.card-title}"
        rounded: "{rounded.xl}"
        padding: 12px
    task-card:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink}"
        typography: "{typography.card-title}"
        rounded: "{rounded.lg}"
        padding: 14px
    task-card-meta:
        backgroundColor: "{colors.surface}"
        textColor: "{colors.ink-muted}"
        typography: "{typography.caption}"
    hint-text:
        backgroundColor: "{colors.background}"
        textColor: "{colors.ink-subtle}"
        typography: "{typography.caption}"
    tag-design:
        backgroundColor: "{colors.tag-design-bg}"
        textColor: "{colors.tag-design-ink}"
        typography: "{typography.caption}"
        rounded: "{rounded.sm}"
        padding: 3px 8px
    tag-dev:
        backgroundColor: "{colors.tag-dev-bg}"
        textColor: "{colors.tag-dev-ink}"
        typography: "{typography.caption}"
        rounded: "{rounded.sm}"
        padding: 3px 8px
    tag-research:
        backgroundColor: "{colors.tag-research-bg}"
        textColor: "{colors.tag-research-ink}"
        typography: "{typography.caption}"
        rounded: "{rounded.sm}"
        padding: 3px 8px
    tag-content:
        backgroundColor: "{colors.tag-content-bg}"
        textColor: "{colors.tag-content-ink}"
        typography: "{typography.caption}"
        rounded: "{rounded.sm}"
        padding: 3px 8px
    tag-neutral:
        backgroundColor: "{colors.tag-neutral-bg}"
        textColor: "{colors.tag-neutral-ink}"
        typography: "{typography.caption}"
        rounded: "{rounded.sm}"
        padding: 3px 8px
    status-chip:
        backgroundColor: "{colors.primary-soft}"
        textColor: "{colors.primary-strong}"
        typography: "{typography.meta}"
        rounded: "{rounded.full}"
        padding: 5px 12px
    avatar-blue:
        backgroundColor: "{colors.avatar-blue}"
        textColor: "{colors.on-primary}"
        typography: "{typography.caption}"
        rounded: "{rounded.full}"
        size: 26px
    avatar-teal:
        backgroundColor: "{colors.avatar-teal}"
        textColor: "{colors.on-primary}"
        typography: "{typography.caption}"
        rounded: "{rounded.full}"
        size: 26px
    avatar-berry:
        backgroundColor: "{colors.avatar-berry}"
        textColor: "{colors.on-primary}"
        typography: "{typography.caption}"
        rounded: "{rounded.full}"
        size: 26px
    avatar-violet:
        backgroundColor: "{colors.avatar-violet}"
        textColor: "{colors.on-primary}"
        typography: "{typography.caption}"
        rounded: "{rounded.full}"
        size: 26px
    avatar-amber:
        backgroundColor: "{colors.avatar-amber}"
        textColor: "{colors.on-primary}"
        typography: "{typography.caption}"
        rounded: "{rounded.full}"
        size: 26px
    progress-track:
        backgroundColor: "{colors.track}"
        rounded: "{rounded.full}"
        height: 6px
    progress-fill:
        backgroundColor: "{colors.primary}"
        rounded: "{rounded.full}"
        height: 6px
    time-progress-fill:
        backgroundColor: "{colors.time-fill}"
        rounded: "{rounded.full}"
        height: 8px
    divider:
        backgroundColor: "{colors.border}"
        height: 1px
    control-border:
        backgroundColor: "{colors.border-strong}"
        height: 1px
    dot-todo:
        backgroundColor: "{colors.status-todo}"
        rounded: "{rounded.full}"
        size: 10px
    dot-progress:
        backgroundColor: "{colors.status-progress}"
        rounded: "{rounded.full}"
        size: 10px
    dot-review:
        backgroundColor: "{colors.status-review}"
        rounded: "{rounded.full}"
        size: 10px
    dot-done:
        backgroundColor: "{colors.status-done}"
        rounded: "{rounded.full}"
        size: 10px
    priority-high:
        backgroundColor: "{colors.prio-high}"
        rounded: "{rounded.sm}"
        size: 8px
    priority-medium:
        backgroundColor: "{colors.prio-medium}"
        rounded: "{rounded.sm}"
        size: 8px
    priority-low:
        backgroundColor: "{colors.prio-low}"
        rounded: "{rounded.sm}"
        size: 8px
    page:
        backgroundColor: "{colors.background}"
        textColor: "{colors.ink}"
        typography: "{typography.body}"
---

## Overview

Tasklane is a task-management app for small teams. The interface is calm and light: a pale grey page, white panels, and a single blue accent that marks the one thing to do next. It should feel like a tidy desk, not a dashboard. Three screens define the product: a kanban board that shows where work stands, a quick create form, and a detail page that holds everything about one task.

Voice is short and plain, in sentence case. Task titles start with a verb ("Design homepage hero section"). Buttons name the result ("New task", "Create task", "Move to review"). Status names are To do, In progress, In review and Done; priorities are Low, Medium and High. Colour never carries meaning alone: every status, priority and label is written out as a word.

## Colors

The palette is neutral first, with one accent.

- **Primary (#2B59D9):** the accent blue. Fill for the primary button, progress bars, the active tab underline and focus borders. White text on it passes 4.5:1. `primary-strong` (#1F46B0) is the same hue as text or link colour; `primary-soft` (#EAF0FD) marks a selected nav item, a selected choice and the In progress chip.
- **Background (#F4F5F7), surface (#FFFFFF), surface-sunken (#EBEDF1):** the page, the panels and cards, and the well that holds the cards in a kanban column. Depth comes from these three steps and 1px borders.
- **Border (#E3E6EB) and border-strong (#D5D9E0):** hairlines on panels and rows; the stronger one outlines inputs and secondary buttons.
- **Ink (#16181D), ink-muted (#4A5160), ink-subtle (#5B6270):** primary, secondary and lightest text. `ink-subtle` is the lightest text colour allowed, 4.5:1 on background and surface.
- **Status (todo, progress, review, done):** 10px dots beside a column name. Decorative, always paired with the name.
- **Priority (high #C2410C, medium #B7791F, low #6B7280):** 8px squares beside the words High, Medium and Low.
- **Tags:** five soft tints with dark text for work types: Design, Dev, Research, Content, and a neutral tint for Planning and free-form labels.
- **Track and time-fill:** the unfilled and the teal filled part of the time-tracked bar. Subtask progress uses `primary`.
- **Avatars:** five deep hues, each with white initials, assigned once per person.

## Typography

Inter throughout, in one family, with weight and size doing the work. Titles are bold and slightly tight (`-0.02em`); everything else sits at 14px.

- **page-title (26px / 700):** screen titles such as Board and Create task.
- **task-title (28px / 700):** the title on the detail page.
- **section-title (16px / 600):** panel headings.
- **card-title (14px / 600):** task titles on cards, column names.
- **body (14px / 400) and body-strong (14px / 600):** descriptions, comments, field values; labels, buttons and names.
- **meta (13px / 500):** breadcrumbs, tabs, status chip text.
- **caption (12px / 500):** due date, comment count, priority word, tag text, hints.
- **overline (12px / 600, +0.04em):** the sidebar section label, set in capitals.

## Layout

A 232px white sidebar on the left and a fluid main area with 32px side padding. On narrow screens the sidebar wraps above the content. The main area stacks a header, an optional tab row and the content.

- **Board:** four columns that share the width, each at least 260px; the row scrolls sideways when it cannot fit. Cards stack with a 10px gap inside a 12px column padding; columns are 16px apart.
- **Create form:** a wide form panel with a narrower properties panel beside it; both wrap under each other on small widths. Fields are 24px apart.
- **Detail page:** a main column of stacked panels (description, subtasks, attachments, activity) and a 300px details panel.

The spacing scale is 4, 8, 12, 16, 20, 24 and 32px. Every button, link and input is at least 44px tall.

## Elevation & Depth

Borders first. Panels, columns and inputs are flat with a 1px border. Only task cards carry a shadow, `0 1px 2px rgba(22,24,29,0.05)`, which lifts them just enough from the grey column well. There are no gradients, no glass and no decorative imagery.

## Shapes

Rounded but not soft. Tags use 6px (`rounded.sm`), nav items and small icon buttons 8px, buttons, inputs and task cards 10px, panels and kanban columns 14px. Avatars, status chips and count badges are fully round. Icons are outlined, 16–18px, with a 2px stroke and round caps.

## Components

- **Buttons:** primary (blue fill, white text, one per screen area), secondary (white, `border-strong`), and link (no fill, blue text). 44px tall, 18px side padding.
- **Task card:** white, 1px border, 10px radius, 14px padding. Rows from top: tag and priority; title; progress bar with count (only if the task has subtasks); due date, comment count and avatar. The whole card is one link to the detail page.
- **Column:** a `surface-sunken` well with a header (status dot, name, count, add button) and a list of cards, ending in an "Add task" link.
- **Fields:** a visible label above each field; 44px inputs with a `border-strong` border and a 2px `primary` border on focus. Priority is a three-option choice where the selected option gets a 2px primary border, a soft blue fill and bold text.
- **Tag and status chip:** tinted background with dark text; the chip is a full-round pill with a dot.
- **Avatar:** 26px disc with two white initials; stacks overlap by 8px with a 2px ring in the page colour.
- **Progress:** 6px bar (8px on the detail page) with the numbers always written beside it.

## Do's and Don'ts

- Do use tokens by name and keep to one primary button per screen area.
- Do pair every colour signal (status, priority, label) with its word.
- Do keep targets at 44px or larger and text at 4.5:1 or better.
- Don't colour a whole card by priority or add a sixth label tint without a new work type.
- Don't put buttons inside a linked task card.
- Don't use shadows on panels, or gradients anywhere.
- Don't use `ink-subtle` for anything lighter than a hint or breadcrumb; lighter greys fail contrast.
