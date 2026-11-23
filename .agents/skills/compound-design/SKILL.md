---
name: compound-design
description: Extract design rules, taste decisions, anti-patterns, and component/token findings from a conversation and compound them into any design system's documentation (e.g., AGENTS.md, design-system.md, or a design notes file). Use after a design session, UI critique, or whenever the user wants to capture and codify design learnings.
---
# Compound Design

Turn fleeting design decisions, critiques, and taste refinements from a conversation into permanent, reusable rules inside a target design system—so every future session starts from a higher baseline.

## 1. Locate & Read the Target Design System
Identify which design system to plug into:
- **In the current workspace:** Look for `AGENTS.md`, `CLAUDE.md`, `design-system.md`, `docs/`, `README.md`, or token/component files (e.g. `globals.css`, `tokens.json`).
- **Upstream design system (for consumer projects):** Check `AGENTS.md`, `components.json` (`registries`), or `package.json` for a referenced upstream design system (e.g. `bergets/kohl-design`). If found, read its `AGENTS.md` / `design-system.md` from a sibling workspace, local path, or GitHub/URL.
- **If multiple or none exist:** Ask the user which design system repo or file(s) to target.
- **Read existing rules first** so you understand the system's structure, terminology, semantic tokens, and existing constraints—never add duplicates or contradict established rules without flagging it.

## 2. Mine the Conversation for Design Findings
Review the conversation (especially user corrections, "make it feel more like...", layout tweaks, and rejections) and classify findings into:
- **Positive Rules & Patterns:** Repeatable layout, hierarchy, typography, spacing, or interaction standards (e.g., *"Use hairline dividers directly on the canvas before reaching for a Card"*).
- **Anti-Patterns / Anti-Slop:** Things that were tried or suggested and explicitly rejected (e.g., *"Never wrap every list item in its own card"*).
- **Token & Visual Decisions:** Color roles, border contrast, elevation, sizing scales, motion, or responsive/mobile rules.
- **Component & Pattern Specs:** New component variants, composition rules, or accessibility requirements.
- **Hunches / Experiments (Optional):** Early ideas not yet ready to be hard rules—save these to a scratch/inbox note rather than polluting core rules.

## 3. Distill into Crisp, Generalizable Rules
Translate conversational feedback into durable, system-level rules:
- **Generalize from the specific:** Turn *"make this card border lighter"* into *"Use subtle, low-contrast borders (`border-border/50`) on surfaces rather than heavy dark outlines."*
- **Reference tokens, not raw values:** Use the target system's semantic tokens, component names, and scale names.
- **Include the "why" briefly** when non-obvious (e.g., *"to prevent iOS Safari viewport auto-zoom"*).
- **Keep it concise:** Match the formatting and tone of the target document. One sharp bullet beats a paragraph.

## 4. Map Findings to the Right Files & Confirm
Before editing, present a brief summary of the extracted findings and where each belongs:
- **Agent behavior & guardrails** → `AGENTS.md` (e.g. Priority Order, Global Rules, Anti-Slop Guide)
- **System architecture, tokens & components** → `design-system.md` (or equivalent system spec)
- **Unproven experiments / inspirations** → Design inbox or backlog note

When working in a **consumer project**, distinguish between **app-specific rules** (write to the local project's `AGENTS.md`) and **system-wide rules** (propose updating the upstream design system repo, e.g. `kohl-design`).

If a finding refines or supersedes an existing rule, propose updating that rule in place rather than appending a conflicting one. Ask the user to confirm (unless they already asked you to apply directly).

## 5. Apply & Verify
1. Edit the target design system files cleanly, preserving unrelated content.
2. If the design system has a verification step (e.g., `npm run build`, lint, or token generation script), run it to ensure nothing broke.
3. Summarize what was compounded and link to the updated sections.
