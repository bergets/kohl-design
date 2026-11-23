---
name: review-design
description: Review UI code, components, pages, or diffs against a design system's accumulated rules, tokens, and anti-slop guidelines (e.g., AGENTS.md, design-system.md). Use before shipping UI, after building a new view, or whenever the user asks for a design review.
---
# Review Design

Audit UI code, layouts, or diffs against the rules and taste decisions accumulated in a target design system—catching anti-patterns, token drift, and layout issues before they ship.

## 1. Load the Design System's Rules
Before reviewing anything, locate and read the target design system's documentation:
- **In the current workspace:** Read `AGENTS.md`, `CLAUDE.md`, `design-system.md`, token definitions (e.g., `globals.css`), and existing UI primitives (`components/ui/*`).
- **If multiple or none exist:** Ask the user which design system rules to review against.
- Extract the active **Priority Order**, **Global Rules**, **Anti-Slop Guide**, **Control Scales**, **Typography & Elevation rules**, and **Mobile/Accessibility requirements**.

## 2. Inspect the Target Work
Determine what is being reviewed (specific file(s), a route/page, `git diff`, or a screenshot) and read the full relevant code—including any child components or styles it composes.

## 3. Audit Against the Rules
Check the target systematically against the system's documented rules:
- **Editorial Restraint & Composition:** Are there too many distinct sections, boxed stat cards, nested `<Card>`s, or decorative badges/eyebrows where whitespace and hairline dividers would do?
- **Components & Tokens:** Does it reuse existing primitives (`@/components/ui/*`) instead of hand-rolling duplicates? Does it use semantic tokens (`bg-primary`, `bg-card`, `border-border`) rather than raw hex values, arbitrary pixels, or generic grays?
- **Control Scale & Uniformity:** Do sibling controls in the same row/toolbar share the exact same `size` prop? Is spacing consistent with the system's rhythm?
- **Typography & Hierarchy:** Are display fonts reserved strictly for hero/section titles and sans/mono used properly for UI and metadata?
- **Mobile & Accessibility:** Are touch targets at least 44×44px (with pseudo-element expansion for compact controls)? Are inputs sized to avoid iOS zoom? Are `focus-visible` rings, ARIA labels, and icon alignments handled properly?
- **Copy & Tone:** Is UI copy in sentence case without emoji, ALL CAPS labels, or robotic filler?

## 4. Present a Crisp, Actionable Review
Keep the review direct and easy to act on:
- **Must Fix:** Clear rule or anti-slop violations (cite the file/line, the specific rule from `AGENTS.md`/`design-system.md`, and the concrete fix).
- **Polish:** Optional refinements to hierarchy, spacing, or copy.
- **Aligned:** Briefly note 1–2 things that already fit the system well (don't pad with fluff).

Offer to apply the fixes directly. If the review surfaces a *new* taste preference or edge case not yet in the docs, suggest running `compound-design` afterward so the rulebook captures it too.
