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
4. System
