# High-Level Requirements
Cafe Restaurant Point of Sale (POS) System

---

## 1. Functional Requirements

Functional requirements describe what the system must do.

---

### 2.1 Sales & Order Management

- FR1: The system shall allow waiters/cashiers to create new customer orders.
- FR2: The system shall allow adding, editing, and removing items from an order.
- FR3: The system shall calculate total cost including taxes and discounts.
- FR4: The system shall generate and print receipts.
- FR5: The system shall support dine-in, takeaway, and delivery orders.
- FR6: The system shall allow splitting bills.
- FR7: The system shall allow order cancellation with authorization.

---

### 2.2 Payment Processing

- FR8: The system shall support multiple payment methods (cash, card, mobile money).
- FR9: The system shall calculate change for cash payments.
- FR10: The system shall record completed transactions.
- FR11: The system shall generate daily sales summaries.

---

### 2.3 Menu Management

- FR12: The system shall allow the administrator to add new menu items.
- FR13: The system shall allow updating prices and item descriptions.
- FR14: The system shall categorize items (drinks, meals, desserts).
- FR15: The system shall mark items as unavailable/out of stock.

---

### 2.4 Inventory Management

- FR16: The system shall track ingredient stock levels.
- FR17: The system shall automatically deduct stock when items are sold.
- FR18: The system shall generate low-stock alerts.
- FR19: The system shall allow manual stock updates.

---

### 2.5 User Management

- FR20: The system shall allow user login and logout.
- FR21: The system shall support role-based access control.
- FR22: The system shall allow the administrator to create, update, and delete users.

---

### 2.6 Reporting

- FR23: The system shall generate daily, weekly, and monthly sales reports.
- FR24: The system shall generate inventory reports.
- FR25: The system shall export reports (PDF/Excel).

---

# 3. Use Case Model

In the inception phase, high-level use cases are presented without excessive detail.

---

## Main Actors

- Cashier  
- Waiter  
- Manager  
- Administrator  
- Kitchen Staff  

---

## Use Case 1: Process Customer Order

**Actor:** Cashier / Waiter
**Description:** Handles order creation, payment, and handoff to the kitchen
for both counter and dine-in service.

### Basic Flow:
1. Actor logs into system.
2. Actor selects "New Order."
3. System prompts Actor to select order type: Counter or Dine-in.
4. If Dine-in: Actor enters the table number. System associates the order
   with that table.
5. Actor selects menu items and quantities.
6. System calculates and displays the running total.
7. Actor confirms the order is complete and selects "Proceed to Payment."
8. Actor selects payment method (cash, card, or mobile money).
9. System processes payment and confirms success.
10. System prints or displays receipt.
11. System sets order status to "Placed" and sends order details to
    the kitchen.

### Alternate Flows:
- A1: Customer cancels order before payment → Actor selects "Cancel Order."
  System voids the order. No payment is processed.
- A2: Payment fails → System notifies Actor. Actor retries payment or
  selects an alternative payment method.
- A3: Menu item is unavailable → System flags the item as out of stock.
  Actor removes the item or substitutes with an available alternative.
- A4: Actor needs to split the bill → Actor selects "Split Bill" before
  payment. System divides the total and processes each portion separately.

## Use Case 2: Manage Menu

**Actor:** Administrator  

### Basic Flow:
1. Admin logs in.
2. Selects "Menu Management".
3. Adds, updates, or removes items.
4. Saves changes.

---

## Use Case 3: Generate Sales Report

**Actor:** Manager  

### Basic Flow:
1. Manager logs in.
2. Selects report type.
3. Selects date range.
4. System generates and displays the report.
5. Manager reviews the report.
6. Manager optionally exports the report (PDF/Excel).

### Alternate Flows:
- A1: No data available for selected range → System displays "No records found" message.
- A2: Manager cancels → System returns to dashboard.

## Use Case 4: Update Inventory

**Actor:** Manager / Administrator

**Description:** Allows the Manager or Administrator to manually update stock levels, add new inventory items, and review current stock status.

### Basic Flow:
1. Actor logs in.
2. Actor selects "Inventory Management."
3. Actor selects an inventory item to update.
4. System displays current stock level for the selected item.
5. Actor enters the updated stock quantity.
6. System saves the updated stock level.
7. System confirms the update was successful.

### Alternate Flows:
- A1: Stock level falls below minimum threshold → System generates a low-stock alert to management.
- A2: Actor adds a new inventory item → System creates a new inventory record with the provided details.
- A3: Actor cancels → System discards changes and returns to inventory list.

## Use Case 5: Update Order Status

**Actor:** Kitchen Staff, Waiter
**Description:** Allows Kitchen Staff and Waiters to update the status of an
active order as it moves through preparation and delivery. Tracks the order
lifecycle from placement through to final delivery at the table.

### Basic Flow:
1. Actor logs into system.
2. Actor navigates to "Active Orders."
3. System displays a list of all current orders and their statuses.
4. Actor selects the order to update.
5. System displays the current status of the selected order.
6. Actor updates the order status according to their role:
   - Kitchen Staff sets status to "Preparing" when preparation begins.
   - Kitchen Staff sets status to "Ready" when preparation is complete.
   - Waiter sets status to "Served" when the order is delivered to the table.
7. System saves the updated status and reflects the change in the active
   orders list.
8. System notifies the relevant actor of the status change (e.g. Waiter
   is notified when an order is "Ready" for delivery).

### Alternate Flows:
- A1: Actor attempts to skip a status (e.g. Placing directly to "Served") →
  System rejects the update and displays an error. Status transitions must
  follow the sequence: Placed → Preparing → Ready → Served.
- A2: Order is cancelled before status is updated → System removes the order
  from the active orders list. No further status updates are permitted.
- A3: Actor selects the wrong order → Actor navigates back to the active
  orders list and selects the correct order.

### Order Status Lifecycle:
Placed → Preparing → Ready → Served

# Non-Functional Requirements
Cafe Restaurant Point of Sale (POS) System

Non-functional requirements define the quality attributes, constraints, and operational standards that the system must satisfy.

---

## 1. Performance Requirements

- NFR1: The system shall process a sales transaction within 2 seconds under normal operating conditions.
- NFR2: The system shall support a minimum of 5 concurrent users without performance degradation.
- NFR3: The system shall generate reports within 5 seconds for daily summaries.
- NFR4: The system shall operate continuously during business hours without system failure.

---

## 2. Security Requirements

- NFR5: The system shall require user authentication before granting access.
- NFR6: The system shall implement role-based access control (RBAC).
- NFR7: The system shall encrypt sensitive payment data.
- NFR8: The system shall maintain an audit log of all transactions and user activities.
- NFR9: The system shall automatically log out inactive users after a defined timeout period.

---

## 3. Usability Requirements

- NFR10: The system interface shall be user-friendly and easy to navigate.
- NFR11: The system interface shall be touch-friendly and operable via both mouse and touchscreen input on standard desktop or laptop computers.
- NFR12: The system shall require no more than 2 hours of training for new users.
- NFR13: The system shall provide clear error messages and user guidance.

---

## 4. Reliability Requirements

- NFR14: The system shall achieve at least 99% uptime during operational hours.
- NFR15: The system shall automatically back up data daily.
- NFR16: The system shall allow recovery of data in case of system failure.

---

## 5. Scalability Requirements

- NFR17: The system shall support future expansion to multiple branches.
- NFR18: The system shall allow addition of new users and menu items without affecting performance.

---

## 6. Compatibility and Hardware Constraints

- NFR19: The system shall operate on standard Windows-based desktop or laptop computers.
- NFR20: The system shall support integration with receipt printers.
- NFR21: The system shall integrate with card payment terminals and mobile money systems.

---

## 7. Maintainability Requirements

- NFR22: The system shall be modular to allow future updates and enhancements.
- NFR23: The system shall provide system error logs for debugging and maintenance.
- NFR24: The system shall allow software updates without loss of existing data.
