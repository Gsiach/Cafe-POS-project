# Inception Phase Retrospective
**Project:** Cafe Restaurant POS System  
**Phase:** Inception  
**Date:** July 2026  

---

## 1. What We Set Out to Do

The Inception phase had one job: answer two questions before committing to building anything.

1. Does this cafe need a POS system, and why?
2. Can our team actually build it within the constraints we have?

The answer to both was yes — but the *quality* of that answer at the end of Inception was significantly better than at the start, because the initial documents contained contradictions that would have caused real damage if carried into Elaboration unchecked.

---

## 2. What We Got Right

Before naming the problems, it is worth being honest about what the team actually did well, because the foundation was not wrong — it was incomplete and inconsistent.

- **The business case was real and grounded.** The problem statement correctly identified that manual order-taking, untracked inventory, and no audit trail for revenue are genuine pain points for a small cafe. The ROI framing, while illustrative, was directionally sound.
- **The risk matrix used proper probability × impact scoring.** That is real risk management practice, not cargo-culted formatting.
- **Offline-first architecture was identified as a constraint driven by Zambia-specific connectivity reality.** This is exactly the kind of domain-specific, non-generic design driver that separates a real project from a tutorial copy.
- **Ingredient-level inventory (FR16–19) was captured correctly.** This reflects actual cafe operations, not the simpler item-level stock model Larman's retail POS uses. It shows the team had genuine domain instinct even if it wasn't fully consistent across documents.
- **The iteration plan mapped correctly to UP phase boundaries and the marking rubric.**

---

## 3. What Went Wrong and Why

### Root Cause
Individual sections were written in isolation and merged without anyone verifying consistency across the whole. No single person owned the complete picture. Nobody's job was to read all eight documents together and ask: "do these agree with each other?"

This is not primarily a cooperation failure or an understanding failure. It is a missing process. The fix is not "try harder next time" — it is adding a specific cross-verification step before any phase is closed.

### Specific Contradictions Found

**1. Hardware contradiction — three documents, three different answers**
- `01_Project_Context.md` said desktop/laptop computers.
- `05_Risk_Analysis_and_Feasibility_Study.md` said 10-inch iOS/Android touchscreen tablets.
- `04_High_Level_Requirements.md` NFR11 said touchscreen support; NFR19 said Windows-based terminals.

These are mutually exclusive. Windows does not run on iOS/Android. An architectural proof-of-concept — worth 5 marks in Elaboration — cannot be built on a contradiction.

**Resolution:** Desktop/laptop computers on Windows. Waiters enter dine-in orders at fixed counter terminals. No mobile devices in current scope.

**2. Actor list inconsistency — every document listed different roles**
- Vision document: Admin, Manager, Cashier (3 roles).
- Project Context stakeholders: Owner/Manager, Cashiers, Kitchen Staff, Customers, Dev Team (no Waiter, no Administrator as separate role).
- Requirements document: Cashier, Waiter, Manager, Administrator, Kitchen Staff (5 roles).

No document agreed with another on who the actors were.

**Resolution:** Canonical five-actor list — Cashier, Waiter, Manager, Administrator, Kitchen Staff — now consistent across all documents and the use case diagram.

**3. Vision document contradicted its own requirements**
The Vision document described a counter-service-only cafe with cashiers as the only order-taking actor. The Requirements document's FR5 explicitly committed to dine-in and table service. Two documents written by the same team, describing different systems.

**Resolution:** Vision document updated to explicitly include dine-in (table) service, matching FR5 and the Business Context description in Project Context.

**4. "Delivery" word collision**
Vision document's Out-of-Scope said "delivery integration" was excluded. FR5 committed to "delivery orders." Same word, two different meanings — third-party courier delivery (excluded) versus waiter delivering food to a table (required). A reader could not tell which was meant.

**Resolution:** FR5 changed to "dine-in and takeaway orders." Out-of-Scope clarified to "third-party delivery platform integration."

**5. Missing use cases for confirmed functionality**
The use case diagram showed "Update Inventory" as an existing use case. The requirements document had FR16–FR19 covering inventory. No written use case existed for it anywhere.

More critically: the entire order lifecycle — Placed → Preparing → Ready → Served — was implied by having Kitchen Staff and Waiter as actors, but no use case documented it. FR26 and UC5 ("Update Order Status") were entirely absent despite being the most structurally important feature distinguishing this system from a generic retail POS.

**Resolution:** UC4 (Update Inventory) and UC5 (Update Order Status) written and added. FR26 and FR27 added covering order status transitions and pre-numbered table assignment.

**6. Use case diagram semantic error**
Kitchen Staff was connected to "Process Customer Order" with an association arrow. Kitchen Staff does not initiate order processing — the Cashier and Waiter do. Kitchen Staff's actual system interaction is updating order status once preparation begins.

Additionally, Waiter was missing its second arrow to "Update Order Status" despite UC5 explicitly naming Waiter as the actor who marks orders Served.

**Resolution:** Kitchen Staff arrow moved to "Update Order Status." Waiter given a second arrow to "Update Order Status." Cashier given a missing arrow to "User Login."

**7. Fabricated-confidence language in the Risk document**
Three specific claims were stated as completed, verified facts when they had not occurred:
- *"We have confirmed the feasibility of using 10-inch touchscreen tablets"* — no procurement or hardware testing happened.
- *"We have determined that AI-driven inventory forecasting may be outside our time constraints"* — phrased as a concluded analysis rather than a scoping decision.
- *"We will conduct User Acceptance Testing with actual cafe staff"* — stated as near-certain when no cafe partner had been secured.

This matters practically: a marker or lecturer who asks "walk me through how you confirmed tablet feasibility" will expose this immediately.

**Resolution:** All three rewritten to honest, hedged language: "we propose," "we estimate," "we plan to, pending securing a partner cafe."

**8. Promised deliverable never produced**
`06_Iteration_and_Project_Plan.md` listed a Glossary as an expected Inception deliverable. No glossary existed in the repository. The team's own plan document flagged a gap that nobody filled.

**Resolution:** `08_Glossary.md` added.

---

## 4. The Lesson That Covers All of These

Every single contradiction above had the same structure: **one part of the project said X, another part said Y, and nobody checked.** The hardware story had three versions because three people wrote three sections and merged without reading each other's work. The actor list had three versions for the same reason. The use case diagram showed a use case that had no written counterpart because the diagram and the requirements document were produced independently.

The principle this forces, going into every phase from here: **documents are not done when they are written. They are done when they have been checked against every other document they could contradict.** Writing and verification are two separate activities. Treating them as one — "I wrote it, therefore it is correct" — is what produced tonight's audit.

---

## 5. Process Change for Elaboration and Beyond

Before any Elaboration document is merged into main:

1. The person who wrote it must re-read it against at least one other existing document and confirm no contradictions.
2. The vocabulary used (class names, actor names, state names) must match exactly across the use cases, domain model, SSDs, and architectural diagram — not approximately, exactly.
3. One person per iteration must do a full cross-document read before the PR is merged. This is a 20-minute task if the documents are well-written. It is a three-hour task if they are not. Do it before merging, not after.

---

## 6. Where Inception Left Us

The Inception phase, after revision, correctly answered both of its questions:

The cafe needs a POS system because manual order-taking creates miscommunication between cashier and kitchen, manual inventory tracking creates untracked stock loss, and the absence of a sales audit trail creates revenue leakage. These are real, specific, domain-grounded problems — not generic justifications.

We should build it, scoped as: a desktop-based counter and dine-in POS system for a small cafe, covering order processing with a four-state lifecycle (Placed → Preparing → Ready → Served), ingredient-level inventory management, role-based access for five actor types, and offline-first operation — deliverable as a working MVP by August 2026.

That is a real answer. It is specific, constrained, and defensible. It is what Inception is supposed to produce.

