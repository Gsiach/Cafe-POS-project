# Glossary
Cafe Restaurant Point of Sale (POS) System

This glossary defines key domain terms used across all project documents.
It serves as the project data dictionary and will be refined in subsequent phases.

---

## Order
A request made by a customer for one or more menu items. An order may be
placed at the counter (counter service) or at a table (dine-in service). An
order is created by a Cashier or Waiter and remains active until payment
is completed.

---

## Order Status
The current state of an order in the system. Valid statuses are:
- **Placed** – Order has been created and payment confirmed, but not yet
  received by the kitchen.
- **Preparing** – Order has been received by Kitchen Staff and is being prepared.
- **Ready** – Order preparation is complete and is awaiting delivery.
- **Served** – Order has been delivered to the customer.
- **Cancelled** – Order was voided before completion.

---

## Table
A designated dine-in seating location within the cafe. Each table is
identified by a table number. An order may be associated with a table
for dine-in service.

---

## Menu Item
A product offered for sale by the cafe, such as a beverage, meal, or
dessert. Each menu item has a name, category, price, and availability
status. Menu items are managed by the Administrator.

---

## Stock / Inventory
The quantity of ingredients or products currently held by the cafe.
Stock levels are updated automatically when a sale is completed and
can be updated manually by a Manager or Administrator. A low-stock
alert is triggered when a stock level falls below its defined minimum
threshold.

---

## Role
A defined set of permissions granted to a staff member within the system.
The system supports the following roles:
- **Administrator** – Full system access including user and menu management.
- **Manager** – Access to reports, inventory, and system oversight.
- **Cashier** – Access to order creation and payment processing.
- **Waiter** – Access to order creation and order status updates.
- **Kitchen Staff** – View-only access to incoming orders and order status updates.
