# Domain Noun List
Cafe Restaurant POS System — Elaboration Phase, Iteration 1

This document identifies the candidate conceptual classes for the Cafe POS
domain model. It is a working document produced before fully-dressed use cases
are written, serving as a shared vocabulary reference for all Elaboration
artifacts.

---

## Method
Noun phrases were extracted from Use Cases 1–5 and Functional Requirements
FR1–FR27 in the Inception Phase. Candidates were filtered using Larman's
criteria — rejecting nouns that are: vague/irrelevant, implemented as
attributes rather than classes, or redundant with another concept.

---

## Key Design Decisions

### 1. No Order Modifiers
The system does not support item-level customisation (e.g. "extra shot",
"no sugar"). Orders are recorded as straightforward MenuItem selections
with quantity. Modifiers are noted as a future enhancement candidate.
Rationale: Not referenced in FR1–FR27; adds domain complexity beyond
current project scope.

### 2. Staff Tracking on Orders
Every Order records the User who created it via a `takenBy` association.
Rationale: All actors are already authenticated via RBAC login, so the
information is available at zero additional cost. Provides accountability
for dispute resolution and enables per-staff sales analysis in reports.

### 3. User Not Staff
The canonical term for any system user is `User`, not `Staff`. Cashier,
Waiter, Manager, Administrator, and KitchenStaff are all subtypes of User.
Order associates back to `User` (takenBy), not `Staff`.
Rationale: `User` is the settled vocabulary term from the Glossary.
Introducing `Staff` would contradict existing domain knowledge.

---

## Rejected Candidates

| Noun | Reason for Rejection |
|------|----------------------|
| System | Too vague, not a domain concept |
| Data | Implementation detail |
| Password | Attribute of User, not a class |
| Date | Attribute, not a class |
| Modifier | Out of scope — see Decision 1 above |

---

## Accepted Conceptual Classes

| # | Class Name | Source | Description |
|---|-----------|--------|-------------|
| 1 | Cafe | Context | The business operating the system |
| 2 | Order | UC1, UC5, FR1 | Core transaction — a customer request for items |
| 3 | OrderLineItem | UC1 | A single MenuItem entry within an Order, with quantity |
| 4 | MenuItem | UC1, UC2, FR5 | A product offered for sale by the cafe |
| 5 | MenuItemCategory | UC2, FR14 | A grouping of MenuItems (e.g. Beverages, Meals) |
| 6 | Table | UC1, FR27 | A dine-in seating location identified by number |
| 7 | Payment | UC1, FR7 | A financial transaction made against an Order |
| 8 | PaymentMethod | UC1, FR8 | The method of payment — cash, card, mobile money |
| 9 | Receipt | UC1, FR10 | Proof of payment issued after successful Payment |
| 10 | OrderStatus | UC5, FR26 | The lifecycle state of an Order |
| 11 | User | FR20, Glossary | Any authenticated staff member with a Role |
| 12 | Cashier | UC1 | User subtype — processes counter orders |
| 13 | Waiter | UC1, UC5 | User subtype — processes dine-in orders, marks Served |
| 14 | Manager | UC3 | User subtype — accesses reports and oversight |
| 15 | Administrator | UC2, UC4 | User subtype — manages system configuration |
| 16 | KitchenStaff | UC5, FR26 | User subtype — updates order status to Preparing/Ready |
| 17 | SalesReport | UC3, FR24 | Aggregated sales data generated for a date range |
| 18 | InventoryItem | UC4, FR16 | A stock item tracked by the system |
| 19 | StockLevel | UC4, FR17 | Current quantity of an InventoryItem |
| 20 | LowStockAlert | FR18 | Notification triggered when StockLevel falls below minimum |
| 21 | Role | FR20, Glossary | Permission set assigned to a User |

---

## Notes for Domain Model
- Order status lifecycle: Placed → Preparing → Ready → Served
- Order has two subtypes by service type: counter order (no Table) and
  dine-in order (associated with a Table)
- Payment has one PaymentMethod per transaction
- StockLevel is deducted automatically when an Order is completed (FR17)
- LowStockAlert is triggered automatically when StockLevel falls below
  defined minimum threshold (FR18)