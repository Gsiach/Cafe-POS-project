# Domain Knowledge Document
**Project:** Cafe Restaurant POS System  
**Course:** CSC4630 — Advanced Software Engineering  
**Phase:** Inception → Elaboration Handoff  
**Purpose:** Shared reference for all team members before touching any Elaboration artifact  

---

## 1. What This System Is and Why It Exists

This system is a Point-of-Sale (POS) application for a small cafe restaurant. It exists because small cafes operating with manual processes — paper order slips, verbal communication between cashier and kitchen, handwritten stock counts — suffer three specific, concrete problems:

1. **Order miscommunication** — verbal or paper-based handoffs between cashier and kitchen produce wrong orders, missed items, and no traceable record of what was ordered.
2. **Untracked inventory loss** — manual stock counting is inaccurate, slow, and happens after loss has already occurred rather than preventing it.
3. **No revenue audit trail** — without a system recording every transaction, managers cannot identify where revenue is leaking, which shifts had discrepancies, or which menu items are actually profitable.

The system solves all three by digitizing the order lifecycle end-to-end — from the moment a customer places an order to the moment it is delivered to their table — and by tracking inventory and sales automatically as a byproduct of normal operation.

---

## 2. How This System Differs From Larman's Generic Retail POS

This is critical for anyone who has read Larman's textbook and is tempted to model this system the same way. **It is not the same system.** Two structural differences make it fundamentally different:

### Difference 1: Multi-Actor Handoff
In Larman's retail POS, the transaction is complete the moment the cashier takes payment. One actor, one continuous interaction, nothing else needs to happen. The customer takes their item and leaves.

In this cafe POS, payment completing is not the end of the transaction — it triggers a second workflow owned by a completely different actor. The order moves from the Cashier/Waiter (who took it) to Kitchen Staff (who prepare it) to Waiter (who delivers it). Three distinct actors, each owning a different stage, none of whom can do their job without knowing what the previous actor did. This handoff chain is the single most important structural feature of this system and must be reflected in every artifact — use cases, domain model, SSDs, and architecture.

### Difference 2: Order Lifecycle With Persistent State
In Larman's retail POS, an order has no ongoing state after payment. Once the sale is processed, it is history. There is nothing to track, update, or monitor.

In this cafe POS, an order has a four-stage lifecycle that persists in the system and changes over time as different actors interact with it:

| State | Meaning | Who Transitions To This State |
|-------|---------|-------------------------------|
| Placed | Order submitted, payment taken, kitchen not yet started | Cashier or Waiter (via Process Customer Order) |
| Preparing | Kitchen Staff have started making the order | Kitchen Staff |
| Ready | Order is finished, waiting for pickup/delivery | Kitchen Staff |
| Served | Order delivered to the customer's table | Waiter |

**This table is the most important domain fact in the entire project.** Every teammate must know it before touching any Elaboration document. If your artifact implies a different state model, or assigns a transition to the wrong actor, it is wrong regardless of how well-written it looks.

---

## 3. The Five Actors and Their System Roles

These are not job title descriptions. Each entry describes what the actor actually does in the software — their system interactions, not their real-world responsibilities.

**Cashier**
Initiates orders for counter/takeaway customers. Logs into the system, creates a new order, selects menu items, processes payment. Payment always occurs at order time — there are no open tabs or deferred payment in this system. Once payment is confirmed, the order status is automatically set to Placed and becomes visible to Kitchen Staff.

**Waiter**
Has two distinct system interactions. First: initiates orders for dine-in customers, same flow as Cashier but with a table number assigned from the pre-configured table list. Second: marks orders as Served once delivered to the table, transitioning the order from Ready to Served. These are separate use cases (Process Customer Order and Update Order Status) performed at different points in time.

**Kitchen Staff**
Owns the middle two order state transitions. Marks an order Preparing when they begin making it, and Ready when it is finished. Kitchen Staff does not initiate orders and does not handle payment — their entire system interaction is reading incoming orders and updating their status. This is the actor that makes this system structurally different from Larman's retail POS.

**Manager**
Manages the menu (adding, editing, removing items) and generates sales reports. The sales report use case exists specifically to address the revenue audit trail problem that motivated building this system. Manager has no involvement in the order lifecycle itself.

**Administrator**
Responsible for system configuration and user account management — creating and managing staff logins, configuring the pre-numbered table list, and system-level settings. Administrator is distinct from Manager: Manager operates the business day-to-day; Administrator sets up and maintains the system itself.

---

## 4. Key Domain Concepts (Canonical Vocabulary)

Every Elaboration artifact must use these exact terms. If you use a different name for the same concept, you are introducing the same vocabulary drift that caused the Inception contradictions.

**Order** — the core transactional entity. Created when a Cashier or Waiter submits a customer's selections. Has a status (Placed/Preparing/Ready/Served), an order type (Counter or Dine-in), and a table number if Dine-in. Payment is recorded against the Order at creation time.

**OrderItem** — a single line within an Order. Represents one menu item selected by the customer, with its quantity. An Order contains one or more OrderItems. This is a separate concept from Order — do not collapse them. An Order for "1 latte, 2 muffins" has one Order and two OrderItems.

**MenuItem** — a product available for sale on the cafe's menu. Has a name, price, and category. Referenced by OrderItems. Managed by the Manager via the Manage Menu use case.

**Table** — a pre-numbered, fixed physical table in the cafe. Not created dynamically — configured once by the Administrator. Assigned to dine-in Orders. The system does not manage table availability or seating capacity — it only uses table numbers as an identifier for order routing and delivery.

**Payment** — recorded at order time, always. Contains amount, method (cash/card), and a reference to the Order it covers. There is no deferred payment, no open tab, and no split payment in the current scope.

**OrderStatus** — the four-state enum: Placed, Preparing, Ready, Served. Lives on the Order entity. Changed by different actors at different points in the lifecycle. Never goes backwards — an order cannot move from Preparing back to Placed.

**User** — any staff member who logs into the system. Has a role (Cashier, Waiter, Manager, Administrator, Kitchen Staff) that determines their system permissions via Role-Based Access Control (RBAC).

---

## 5. Deployment and Hardware Decision

**Decision:** Desktop and laptop computers running Windows. No tablets, no mobile devices.

**Reason:** Tablets and mobile devices would have added touch-specific UI design, cross-platform build tooling, and real-device testing overhead that is unrealistic for a 15-week student timeline. Desktop eliminates this complexity entirely.

**Waiter mobility:** Waiters enter dine-in orders at fixed counter terminals before returning to serve the table. This resolves the apparent contradiction between "Waiters serve tables" and "desktop-only system" — Waiters use the same fixed terminals as Cashiers, just for a different order type (Dine-in with table number assigned).

**Offline-first:** The system must function during network/connectivity interruptions. This is a Zambia-specific constraint — unreliable internet connectivity is a real operational risk, not a hypothetical one. The architecture must account for this. This is a non-negotiable requirement and should be treated as a first-class architectural constraint in Elaboration's proof-of-concept.

---

## 6. What Is In Scope and What Is Not

Be explicit about this before starting any Elaboration artifact. Scope creep — adding features that sound good but weren't committed to — is how projects fail to deliver by deadline.

**In Scope:**
- Order processing for counter (takeaway) and dine-in (table) service
- Four-state order lifecycle (Placed → Preparing → Ready → Served)
- Menu management (add, edit, remove items)
- Ingredient-level inventory tracking (stock decremented per ingredient, not per finished item)
- Sales report generation
- Role-based access control for five actor types
- User login and authentication
- Offline-first operation
- Receipt printing/display

**Out of Scope (current release):**
- Third-party delivery platform integration (Uber Eats, etc.)
- Online ordering or customer-facing ordering interface
- AI-driven inventory forecasting
- Mobile or tablet interfaces
- Table availability/reservation management
- Split payments or open tabs
- Multi-branch support

If any teammate wants to add something not on the In Scope list, it requires an explicit team decision and a scope document update — not a unilateral addition to a use case or domain model.

---

## 7. The Cross-Verification Rule (Non-Negotiable)

The root cause of every Inception contradiction was this: sections were written in isolation and merged without anyone checking them against each other.

The fix is one specific process step, applied before every PR merge from Elaboration onward:

**Before any Elaboration document is merged into main, one person must read it against every existing document it could contradict and confirm they agree.** Vocabulary must match exactly — not approximately. Actor names, state names, class names, and use case names must be identical across every artifact that references them.

This takes 20 minutes when documents are well-written. It takes three hours when they are not. Do it before merging, not after.

Nathan owns this role for Elaboration Iteration 1.

