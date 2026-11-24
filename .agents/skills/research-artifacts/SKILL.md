---
name: research-artifacts
description: Turn raw qualitative user research (interview transcripts, field notes, usability sessions, support tickets) into structured, visual service design artifacts—Journey Maps, Service Blueprints, Stakeholder Maps, and Opportunity Solution Trees—instead of generic markdown bullet lists. Use when synthesizing user research, mapping a service flow, or turning interview notes into visual HTML/canvas artifacts.
---
# Research Artifacts

Turn messy qualitative research into structured, scannable **service design artifacts**—never a flat wall of markdown bullet points.

## 1. Ground Every Claim in Evidence
Before drawing or structuring anything, parse the raw inputs (interview transcripts, usability notes, support logs, field observations):
- **Assign source IDs** to participants or sources (`P1`, `P2`, `Ticket #412`).
- **Extract atomic evidence**: verbatim quotes, observed behaviors, emotional highs/lows, friction moments, and system handoffs.
- **Preserve contradictions**: If `P1` loves a shortcut and `P4` finds it confusing, keep both quotes attached rather than averaging them into vague consensus.

## 2. Choose the Right Service Design Lens
Pick the artifact that answers the team's actual question (or offer to switch lenses on the same underlying evidence):

### Journey Map — *Time, Emotion & Experience*
Use when the question is: *"Where does the user struggle or feel friction over time?"*
- **Columns:** Sequential stages (e.g., Trigger → Onboarding → First Value → Ongoing Use → Recovery).
- **Rows:** User Actions · Verbatim Quotes · Emotion Curve (High / Neutral / Low) · Pain Points · Opportunities.

### Service Blueprint — *Frontstage, Backstage & Handoffs*
Use when the question is: *"Why did the experience break down behind the scenes?"*
- **Layers separated by explicit lines:**
  1. **Physical Evidence & Customer Actions** (what the user touches and does)
  2. *— Line of Interaction —*
  3. **Frontstage** (staff, UI, emails, notifications the user directly sees)
  4. *— Line of Visibility —*
  5. **Backstage** (internal ops, manual reviews, team handoffs hidden from the user)
  6. *— Line of Internal Interaction —*
  7. **Support Processes** (APIs, databases, third-party vendors, policies)
- Highlight **fail points** (red/crimson) and **wait states / handoff delays** directly on the transitions.

### Stakeholder Map — *Actors, Incentives & Power*
Use when the question is: *"Who influences this service and where do incentives conflict?"*
- Group actors by proximity (**Core Users**, **Internal Operators**, **External / Ecosystem**).
- Show what each actor **needs**, what they **control**, and **tensions / value flows** between them.

### Ecosystem / Value Flow Map — *Data, Trust & Handoffs*
Use when the question is: *"What actually moves between systems and teams, and where does 'human middleware' fill the gaps?"*
- Map **directional flows** between actors and systems (`Source → Target`), tagged by flow type (**Data**, **Approval**, **Money**, **Trust/Status**).
- Explicitly mark **manual workarounds** (e.g., copy-pasting PDFs, ad-hoc phone calls) and **broken/missing loops** (e.g., no confirmation returned to the user).

### Behavioral Archetypes — *Modes Over Demographics*
Use when the question is: *"How do different user mindsets or situations change what the service needs to do?"*
- **NEVER build demographic persona bios** (*"Sarah, 34, likes coffee"*). Build **behavioral modes** grounded in observed triggers, constraints, preferred channels, and definitions of "done".
- One person can move between archetypes depending on context (e.g., *Urgent First-Timer* vs. *Routine Repeat*).

### Opportunity Solution Tree (OST) — *Research to Product Bets*
Use when the question is: *"What should we build or test next based on what we learned?"*
- **Root:** One clear **Desired Outcome** (behavioral or business metric).
- **Branches:** **Opportunities** (unmet needs or pains directly backed by participant quotes).
- **Leaves:** **Solutions** & lightweight **Experiments** to validate each bet.

## 3. Anti-Slop Rules for Research Synthesis
- **NEVER** flatten rich qualitative research into a 40-bullet markdown summary when a spatial, temporal, or relational artifact is needed.
- **NEVER** invent fictional demographic persona bios; use evidence-backed Behavioral Archetypes instead.
- **NEVER** invent quotes or metrics—every node or stage must link back to at least one `P#` source or explicitly flag `[Assumption — needs validation]`.
- **NEVER** use rainbow sticky-note clutter or decorative badges; use calm editorial hierarchy (hairline borders, clear lane labels, restrained semantic accents for friction vs. opportunity).
- **ALWAYS** surface the 2–3 highest-leverage **inflection points** (biggest drop in emotion, slowest backstage handoff, or most-cited opportunity) so the team knows where to act.

## 4. Output Format
- **When visual UI / HTML is available** (e.g. `generative_ui` or a web canvas): Render an interactive, inspectable artifact where clicking a stage, lane, flow, archetype, or opportunity reveals the underlying verbatim `P#` quotes and proposed next steps, plus a switcher to view the same dataset across lenses.
- **When text-only:** Use clean Markdown tables or Mermaid diagrams (`flowchart LR` / `flowchart TD`) with explicit lane/stage structure and inline `(P1, P3)` citations.
