# Elaboration Phase — Work Division Plan
**Project:** Cafe Restaurant POS System  
**Course:** CSC4630 — Advanced Software Engineering  
**Methodology:** Unified Process (UP) — Iterative & Incremental  
**Phase:** Elaboration (Iteration 1 + Iteration 2)  

---

## Before Anyone Starts — Non-Negotiable

Read both of these documents before touching any Elaboration file:

- `inception_retrospective.md` — what went wrong in Inception, what was fixed, and why
- `domain_knowledge.md` — what the system is, the five actors, the four order states, canonical vocabulary, scope boundaries, hardware decision

**If you have not read both documents, do not start your artifact.**

Every contradiction we found in Inception happened because people started working without a shared understanding. These two documents exist specifically to prevent that from happening again.

---

## Ground Rules

1. **Exact vocabulary only.** Use the terms in `domain_knowledge.md` Section 4 — Order, OrderItem, MenuItem, Table, Payment, User, OrderStatus. No synonyms, no alternatives. Wrong names in your artifact means it contradicts someone else's artifact.

2. **Branch naming:** `elaboration/iteration-1-[your-artifact]` and `elaboration/iteration-2-[your-artifact]`. Examples: `elaboration/iteration-1-domain-model`, `elaboration/iteration-2-ui-prototypes`.

3. **Nobody merges their own PR.** Open a PR when your artifact is ready, tag Member A for cross-verification. Member A reads it against all existing documents before merging.

4. **Push drafts early.** Don't wait until your artifact is finished to push. Push early drafts so Member A can flag issues while you can still fix them cheaply, not after you've spent three days on a wrong direction.

5. **Sequence dependencies are real.** If your artifact depends on someone else's work, do not start on incomplete inputs. Starting on a draft domain model produces SSDs that need to be redrawn — that costs more time than waiting would have.

---

## The Writing Sequence (Iteration 1)

This is the order work must happen, not just a suggestion:

```
Step 1: Member A — Domain noun list + draft use cases
              ↓
Step 2: Member B — Domain model UML diagram
              ↓
Step 3: Member A — Revise use cases against finished diagram
              ↓
Step 4: Member C — System Sequence Diagrams
        Member D — Architectural Package Diagram (parallel with Step 4)
              ↓
Step 5: Member A — Cross-verify all artifacts before any PR merges
```

Member E supports Member A on cross-verification throughout Iteration 1.

---

## ITERATION 1 — Detailed Assignments

### Member A (Nathan)
**Artifacts:** Domain Noun List + Fully-Dressed Use Cases  
**Files:** `ELABORATION PHASE/ITERATION 1/01_Fully_Dressed_Use_Cases.md`  
**Goes first. Everyone else depends on this.**

Deliverables:
- Domain noun list — rough conceptual classes, their key attributes, and associations between them. This is the shared vocabulary that Member B diagrams and Members C and D reference.
- Draft fully-dressed use cases for three key scenarios: Process Customer Order, Update Order Status, Manage Menu. Treated as drafts — expect to revise after Member B finishes.
- Design notes addendum — one page of bullet points capturing non-obvious decisions and reasoning for Member B. Example: why OrderItem exists separately from Order, why Table is a fixed reference not a managed entity. This is what prevents Member B from misinterpreting the noun list.
- Final revision of use cases after Member B's domain model is done — mostly vocabulary alignment, not a full rewrite.
- Cross-document verification before every PR merges into main throughout both iterations.

**Must deliver before:** Member B can start.

---

### Member B
**Artifact:** Domain Model UML Diagram  
**Files:** `ELABORATION PHASE/ITERATION 1/02_Domain_Model.md` + `ELABORATION PHASE/ITERATION 1/diagrams/domain_model.png`  
**Goes second.**

Deliverables:
- UML class diagram showing all conceptual classes, their attributes, and associations
- No methods yet — this is a conceptual domain model, not a design class diagram. Methods come in Iteration 2.
- Must use exact class names from Member A's noun list and design notes — do not rename concepts
- If any concept in the noun list is unclear or seems wrong, flag it to Member A before drawing, not after

Key classes to expect from `domain_knowledge.md` Section 4: Order, OrderItem, MenuItem, Table, Payment, User. Member A's draft use cases will surface additional concepts.

**Cannot start until:** Member A delivers noun list + draft use cases + design notes.  
**Must deliver before:** Member A's use case revision pass, Member C's SSDs.

---

### Member C
**Artifact:** System Sequence Diagrams (SSDs)  
**Files:** `ELABORATION PHASE/ITERATION 1/03_System_Sequence_Diagrams.md` + `ELABORATION PHASE/ITERATION 1/diagrams/ssd_*.png`  
**Goes third, after Member A's final use case revision.**

Deliverables:
- One SSD per key scenario: Process Customer Order, Update Order Status, Manage Menu (minimum three)
- SSDs show message exchanges between actors and the system treated as a black box — not internal system logic
- Must use exact actor names and system operation names from the finalized use cases — not the draft versions
- One `.png` file per SSD, named clearly: `ssd_process_customer_order.png`, `ssd_update_order_status.png`, `ssd_manage_menu.png`

**Cannot start until:** Member B's domain model is finalized AND Member A has completed the use case revision pass. Using draft use cases produces SSDs that will need to be redrawn entirely.

---

### Member D
**Artifact:** Architectural Proof of Concept  
**Files:** `ELABORATION PHASE/ITERATION 1/04_Architectural_Proof_of_Concept.md` + `ELABORATION PHASE/ITERATION 1/diagrams/package_diagram.png`  
**Can work in parallel with Member C once Member B finishes.**

Deliverables:
- Written description of the layered architecture — at minimum: Presentation layer, Application/Domain layer, Data/Persistence layer
- Package diagram showing how the system is structured architecturally
- Must explicitly address the offline-first constraint — how does the architecture handle operation without network connectivity? This is a non-negotiable architectural requirement driven by Zambia-specific infrastructure reality.
- Must reflect the desktop/Windows deployment decision throughout

**Cannot start until:** Member B's domain model is done.  
**Does not need to wait for:** Member C's SSDs — can work in parallel.

---

### Member E
**Iteration 1 Role:** Cross-verification support + Iteration 2 preparation  

In Iteration 1, the Updated Risk List is not due — that is an Iteration 2 deliverable per the rubric. Member E therefore:
- Acts as second pair of eyes supporting Member A on cross-verification — two people reading for contradictions catch more than one
- Begins early research and drafting for the remaining use cases (Generate Sales Report, Update Inventory, User Login) that are due in Iteration 2
- Drafts `ELABORATION PHASE/ITERATION 2/04_Updated_Risk_List_and_Mitigation.md` early while others are finishing Iteration 1 artifacts

**Iteration 2 primary owner:** Remaining Use Cases + Updated Risk List and Mitigation.

---

## ITERATION 2 — Assignments

| Member | Artifact | Files |
|--------|----------|-------|
| Member A (Nathan) | Cross-verification of all Iteration 2 artifacts + review of remaining use cases | Throughout |
| Member B | Design Class Diagrams — refines the Iteration 1 domain model by adding methods, visibility, and refined associations | `02_Design_Class_Diagrams.md` + `diagrams/` |
| Member C | UI Prototypes — screen mockups for key scenarios | `03_UI_Prototypes.md` + `diagrams/` |
| Member D | Supports Member B on Design Class Diagrams — architectural layer decisions feed directly into class structure | `02_Design_Class_Diagrams.md` |
| Member E | Remaining Use Cases (Generate Sales Report, Update Inventory, User Login) + Updated Risk List and Mitigation | `01_Remaining_Use_Cases.md` + `04_Updated_Risk_List_and_Mitigation.md` |

---

## What Each Artifact Must Contain — Quick Reference

### Fully-Dressed Use Case (Member A)
Each use case needs: Use Case name, Actor(s), Preconditions, Postconditions, Basic Flow (numbered steps), Alternate Flows (what can go wrong and what happens), Special Requirements.

### Domain Model (Member B)
UML class diagram with: class names, attributes with types, associations with multiplicity (e.g. 1 Order contains 1..* OrderItems), aggregation/composition where appropriate. No methods.

### System Sequence Diagram (Member C)
For each scenario: actor on the left, system boundary box in the middle, numbered messages going in (actor → system) and responses coming out (system → actor). Match operation names exactly to use case steps.

### Architectural Proof of Concept (Member D)
Package diagram showing layers. Written section explaining: what each layer does, what technology/framework each layer uses, how offline-first is handled, how layers communicate. This is the document that proves the architecture is real, not just named.

### Design Class Diagrams (Member B + D, Iteration 2)
Refines the domain model by adding: method signatures, visibility (+/-/#), refined types, navigation arrows. This is where the domain model becomes something a developer can actually implement from.

### UI Prototypes (Member C, Iteration 2)
Wireframes or mockups for key screens: Order entry screen, Kitchen display screen, Manager reports screen. Does not need to be pixel-perfect — needs to show layout, navigation flow, and how actors interact with the system visually.

### Updated Risk List (Member E, Iteration 2)
Takes the Inception risk list, updates probability/impact scores based on what was learned in Elaboration, adds new risks discovered, and documents mitigation actions taken or planned.

---

## The Cross-Verification Checklist (Member A runs this before every merge)

- [ ] Vocabulary matches `domain_knowledge.md` Section 4 exactly — no synonyms
- [ ] Actor names match the canonical five: Cashier, Waiter, Manager, Administrator, Kitchen Staff
- [ ] Order states match exactly: Placed, Preparing, Ready, Served
- [ ] State transition ownership matches: Cashier/Waiter → Placed, Kitchen Staff → Preparing/Ready, Waiter → Served
- [ ] Class names in this artifact match class names in the domain model
- [ ] Operation names in SSDs match step descriptions in the use cases
- [ ] No new scope added without explicit team decision and domain knowledge document update

If any item fails this checklist, the PR does not merge until it is fixed.

---

## Reminder — Why This Process Exists

Every contradiction in our Inception documents had the same root cause: sections were written in isolation and merged without anyone checking them against each other. The cross-verification rule and the writing sequence above exist specifically to prevent that from happening in Elaboration.

The process is not bureaucracy. It is the cheapest way to catch a wrong class name before it propagates into five other artifacts and costs a week to unwind.

