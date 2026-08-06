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

### 9. SalesReport Is Not a Domain Class
SalesReport fails the same filter as Receipt. FR24 says "generate sales
reports filtered by date range" — the Manager requests it, the system
displays it, and nothing in FR1–FR27 references storing, reprinting, or
managing SalesReport after generation. The data it displays already lives
in Order and OrderLineItem. SalesReport is a query result over those
classes, not a persistent domain concept.
Rationale: Fire-and-forget output. Same filter applied to Receipt.

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
| SalesReport | Operation output only — query result over Order and OrderLineItem. No persistent storage or lookup referenced in FR1–FR27. Same filter applied to Receipt |

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
| 14 | InventoryItem | UC4, FR16 | A stock item tracked by the system. Carries `currentQuantity: Integer` and `minimumThreshold: Integer` |
| 15 | LowStockAlert | FR18 | Notification triggered when InventoryItem currentQuantity falls below minimumThreshold |

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

---

## Design Notes Addendum
These notes explain non-obvious decisions that cannot be inferred from the
class table alone. They exist so the domain modeler can draw the correct
diagram without needing to reconstruct the reasoning from scratch.

---

**1. Why `OrderLineItem` exists as a separate class from `Order`**
An Order contains multiple items, each with its own MenuItem reference,
quantity, and line price. If OrderLineItem did not exist as a separate
class, these per-item details would have to be stored as repeating
attributes on Order — which violates basic normalization and makes it
impossible to represent "3 lattes and 2 sandwiches" as distinct,
individually-priced entries. OrderLineItem is the standard solution to
the one-to-many relationship between an Order and its contents. Every
POS system at any scale requires this class. It is not optional.

---

**2. Why `User` subtypes exist rather than one `User` class with a role attribute**
A single User class with a `role` attribute is sufficient for authentication
and RBAC — the system knows who you are and what role you have. The subtypes
(Cashier, Waiter, Manager, Administrator, KitchenStaff) are kept in the
domain model because they have genuinely different associations and
participation in use cases, not just different data. Waiter associates
with Order via `takenBy` and participates in UC5. KitchenStaff participates
in UC5 but cannot create orders. Manager generates reports. Administrator
manages MenuItems and InventoryItems. These behavioral differences justify
separate subtypes in the conceptual model. In implementation, this may
collapse to a single User table with a role column — but at the domain
modeling level, the subtypes make the different responsibilities visible
and traceable.

---

**3. Why `Table` is an optional association on `Order`, not a separate order subtype**
The only difference between a counter order and a dine-in order is whether
a Table is associated. There is no difference in behavior — both go through
the same creation flow, the same payment flow, and the same status lifecycle
(Placed → Preparing → Ready → Served). Larman's criterion for inheritance
is genuinely different behavior, not different data. A nullable `table`
association on Order (null for counter, populated for dine-in) is simpler,
more maintainable, and just as expressive. Creating CounterOrder and
DineInOrder as subtypes would add two classes and an inheritance hierarchy
to solve a problem that one optional association already solves cleanly.

---

**4. Why `LowStockAlert` is kept as a class rather than rejected as an attribute**
LowStockAlert is not an attribute of InventoryItem — it is a distinct
domain event that the system generates and that has its own lifecycle
separate from the InventoryItem that triggered it. An attribute on
InventoryItem could tell you the current quantity is below threshold,
but it cannot represent: when the alert was generated, whether it has
been acknowledged by a Manager, or a history of past alerts for the
same item. LowStockAlert exists as a class because it is a named,
persistent domain event — not just a boolean flag. It survives the
filter that rejected OrderStatus and PaymentMethod because those had
no independent lifecycle; LowStockAlert does.

---

**5. Why `SalesReport` is rejected despite appearing in UC3 and FR24**
SalesReport fails the same filter that rejected Receipt. FR24 says
"generate sales reports filtered by date range" — the Manager requests
it, the system displays it, and nothing in FR1–FR27 references storing,
reprinting, or managing SalesReport after it is generated. The data
it displays already lives in Order and OrderLineItem. SalesReport is
a query result over those classes, not a persistent domain concept.
Keeping it as a class would mean drawing a box in the domain model
that has no real associations — it would just float there connected
to nothing, which is the signal that something was listed but not
actually needed. Rejected for the same reason as Receipt: fire-and-forget
system output.