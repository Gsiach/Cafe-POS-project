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
**Description:** Handles order creation and payment.

### Basic Flow:
1. Actor logs into system.
2. Actor selects "New Order".
3. Actor selects menu items.
4. System calculates total.
5. Actor selects payment method.
6. System confirms payment.
7. System prints receipt.
8. Order is sent to the kitchen.

### Alternate Flows:
- A1: Customer cancels order.
- A2: Payment fails → Retry payment.

---

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
