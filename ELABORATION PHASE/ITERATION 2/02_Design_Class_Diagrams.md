3. :# Design Class Diagrams
Cafe Restaurant POS System — Elaboration Phase, Iteration 2

This document presents the Design Class Diagram for the Cafe Restaurant POS
System, refining the conceptual domain model from Iteration 1 by adding
method signatures, visibility markers, and refined associations. This
artifact bridges the gap between the domain model and implementation,
providing a blueprint that developers can directly implement during
Construction.

*Diagram:* ![Design Class Diagram](diagrams/cafe%20POS%20design%20class%20diagram.png)

---

## 1. What Changed From the Domain Model

The domain model (Iteration 1) showed conceptual classes with attributes
and associations only — no methods, no visibility markers. This design
class diagram adds:

- *Visibility markers* — private (-) for attributes, public (+)
  for methods, following standard UML convention
- *Method signatures* — typed parameters and return types for every
  operation derived from the use cases
- *Role-specific methods* — each User subtype now has the specific
  operations that reflect its domain responsibilities
- *Refined return types* — collections typed as List<ClassName>
  where appropriate

---

## 2. Design Decisions Per Class

### Order
Methods added trace directly to UC1 and UC5:
- calculateTotal(): double — computes the running total across all
  OrderLineItems, called when Actor confirms the order in UC1 step 8
- addLineItem(item: MenuItem, quantity: int): void — adds a new
  OrderLineItem to the order, called in UC1 step 5
- setStatus(status: OrderStatus): void — enforces the state
  transition lifecycle (Placed → Preparing → Ready → Served), called
  in UC5 step 6
- getStatus(): OrderStatus — returns the current status for display
  on the Active Orders screen
- getLineItems(): List<OrderLineItem> — returns all line items for
  the Order summary display and kitchen notification
- updateStatus(newStatus: OrderStatus): void — validates and applies
  status transitions, enforcing role-based rules from UC5

### OrderLineItem
- calculateSubtotal(): double — computes quantity × unit price for
  this line, used by Order.calculateTotal()
- getQuantity(): int / setQuantity(quantity: int): void — accessor
  and mutator for quantity, used when Actor modifies items before
  confirming (UC1 Extension 7a)

### MenuItem
- getPrice(): double / setPrice(): void / updatePrice(): void —
  price management operations for UC2 (Manage Menu)
- getName(): String — returns the item name for display on order
  entry and kitchen screens
- isAvailable(): boolean / setAvailability(): void — supports
  UC2's availability toggle for Manager role and UC1 Extension 4a
  (unavailable item detection)

### MenuItemCategory
- getName(): String / setName(): void — category management
  for menu organisation in UC2

### Table
- getTableNumber(): int — returns the table identifier for dine-in
  order association in UC1 step 3
- setOccupied(status: boolean): void — marks a table as occupied
  when a dine-in order is placed
- isOccupied(): boolean — checks table occupancy status

### Payment
- processTransaction(): boolean — executes the payment and returns
  success/failure, called in UC1 step 10
- getAmount(): double — returns the payment amount for receipt
  generation in UC1 step 13

### User (base class)
- login(password: String): boolean — authenticates the user against
  stored credentials, core to UC6
- logout(): void — terminates the session, supporting NFR9
  (auto-logout after inactivity)
- getRole(): Role — returns the user's assigned Role for RBAC
  enforcement throughout the system

### Role
- getRoleName(): String — returns the role name for RBAC checks
  and permission enforcement

### KitchenStaff (User subtype)
- markOrderReady(order: Order): void — specific operation for
  Kitchen Staff's domain responsibility of transitioning an order
  to Ready status in UC5

### Administrator (User subtype)
- createUser(username: String, role: Role): User — provisions new
  staff accounts, core Administrator responsibility from UC6
- updateUserRole(userId: String, newRole: Role): void — modifies
  an existing user's role assignment
- deactivateUser(userId: String): void — disables a user account,
  supporting the account lockout scenario in UC6 Extension 2b

### Manager (User subtype)
- generateReport(): void — initiates sales report generation,
  core Manager responsibility from UC3

### Waiter (User subtype)
- sendToKitchen(order: Order): void — communicates order details
  to the kitchen display after order confirmation in UC1 step 12

### Cashier (User subtype)
- executePayment(order: Order, payment: Payment): void — processes
  the payment transaction for a completed order in UC1 step 10

### InventoryItem
- deductQuantity(amount: int): void — decrements stock when an
  order is completed, triggered by UC4's automatic deduction sub-flow
- addQuantity(amount: int): void — increments stock during manual
  updates in UC4 step 3
- isLowStock(): boolean — checks whether current quantity is below
  minimum threshold, triggering LowStockAlert generation
- checkThreshold(): boolean — validates threshold conditions after
  any quantity change

### LowStockAlert
- acknowledge(): void — sets isAcknowledged to true when Manager
  reviews the alert, from UC4 Extension 6a
- getAlertDetails(): String — returns alert information for
  display on the Manager dashboard

---

## 3. Associations Carried Forward From Domain Model

All associations from the conceptual domain model are preserved:
- Order [1] —— [1..*] OrderLineItem (composition)
- OrderLineItem [1..*] —— [1] MenuItem
- MenuItem [*] —— [1] MenuItemCategory
- Order [1] —— [0..1] Table (optional, dine-in only)
- Order [1] —— [1] Payment
- Order [*] —— [1] User (takenBy association)
- User [*] —— [1] Role
- InventoryItem [1] —— [*] LowStockAlert
- MenuItem [] —— [] InventoryItem
- User —— Cashier, Waiter, Manager, Administrator,
  KitchenStaff (inheritance)