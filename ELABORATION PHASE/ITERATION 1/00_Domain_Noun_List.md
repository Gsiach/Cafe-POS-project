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

### 4. Order Has Optional Table Association, Not Subtypes
Order has an optional association to Table — null for counter orders,
populated for dine-in orders. No inheritance used.
Rationale: The only difference between counter and dine-in orders is
whether a Table is associated. That is a data difference, not a behavioral
difference. Larman's criteria says inheritance requires genuinely different
behavior, not just different data.

### 5. OrderStatus Is an Enumeration Attribute, Not a Class
Order carries a `status` attribute of enumeration type:
`status: {Placed, Preparing, Ready, Served}`.
Rationale: OrderStatus has no independent behavior or associations.
It is a four-value enum — implementing it as a standalone class would
be unnecessary complexity.

### 6. StockLevel Merged Into InventoryItem
InventoryItem carries `currentQuantity: Integer` and
`minimumThreshold: Integer` as direct attributes.
Rationale: StockLevel has no independent lifecycle or associations.
It is data on InventoryItem, not a separate concept.

### 7. PaymentMethod Is an Enumeration Attribute, Not a Class
Payment carries a `method` attribute of enumeration type:
`method: {Cash, Card, MobileMoney}`.
Rationale: Three fixed values with no independent behavior or associations.
Same filtering decision applied to OrderStatus.

### 8. Receipt Is Not a Domain Class
Receipt is a system output operation, not a persistent domain concept.
The system generates and prints/displays a receipt once per completed
Payment. Nothing in FR1–FR27 references storing, looking up, or managing
receipts after they are issued.
Rationale: Fire-and-forget output. No persistent storage justified.

---

## Rejected Candidates

| Noun | Reason for Rejection |
|------|----------------------|
| System | Too vague, not a domain concept |
| Data | Implementation detail |
| Password | Attribute of User, not a class |
| Date | Attribute, not a class |
| Modifier | Out of scope — see Decision 1 above |
| Cafe | Business context only — no domain behavior or associations |
| OrderStatus | Enumeration attribute on Order — `status: {Placed, Preparing, Ready, Served}` |
| StockLevel | Attribute of InventoryItem — represented as `currentQuantity` and `minimumThreshold` directly on InventoryItem |
| PaymentMethod | Enumeration attribute on Payment — `method: {Cash, Card, MobileMoney}` |
| Receipt | Operation output only — system generates and prints/displays once. No persistent storage or lookup referenced in FR1–FR27 |

---

## Accepted Conceptual Classes

| # | Class Name | Source | Description |
|---|-----------|--------|-------------|
| 1 | Order | UC1, UC5, FR1 | Core transaction — a customer request for items. Carries `status: {Placed, Preparing, Ready, Served}` and optional association to Table |
| 2 | OrderLineItem | UC1 | A single MenuItem entry within an Order, with quantity and price |
| 3 | MenuItem | UC1, UC2, FR5 | A product offered for sale by the cafe |
| 4 | MenuItemCategory | UC2, FR14 | A grouping of MenuItems (e.g. Beverages, Meals) |
| 5 | Table | UC1, FR27 | A dine-in seating location identified by number. Optional association on Order — null for counter orders |
| 6 | Payment | UC1, FR7 | A financial transaction made against an Order. Carries `method: {Cash, Card, MobileMoney}` |
| 7 | User | FR20, Glossary | Any authenticated staff member with a Role |
| 8 | Cashier | UC1 | User subtype — processes counter orders |
| 9 | Waiter | UC1, UC5 | User subtype — processes dine-in orders, marks Served |
| 10 | Manager | UC3 | User subtype — accesses reports and oversight |
| 11 | Administrator | UC2, UC4 | User subtype — manages system configuration |
| 12 | KitchenStaff | UC5, FR26 | User subtype — updates order status to Preparing/Ready |
| 13 | Role | FR20, Glossary | Permission set assigned to a User |
| 14 | SalesReport | UC3, FR24 | Aggregated sales data generated for a date range |
| 15 | InventoryItem | UC4, FR16 | A stock item tracked by the system. Carries `currentQuantity: Integer` and `minimumThreshold: Integer` |
| 16 | LowStockAlert | FR18 | Notification triggered when InventoryItem currentQuantity falls below minimumThreshold |

---

## Notes for Domain Model
- Order status lifecycle: Placed → Preparing → Ready → Served
- Order has an optional association to Table (null = counter, populated = dine-in)
- Every Order records the User who created it via `takenBy` association
- Payment carries `method: {Cash, Card, MobileMoney}` as enumeration attribute
- InventoryItem currentQuantity is deducted automatically when an Order
  is completed (FR17)
- LowStockAlert is triggered automatically when InventoryItem
  currentQuantity falls below minimumThreshold (FR18)
- User subtypes (Cashier, Waiter, Manager, Administrator, KitchenStaff)
  are distinguished by Role in the domain model