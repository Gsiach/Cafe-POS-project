# Domain Model (Data Dictionary)
Cafe Restaurant POS System — Elaboration Phase, Iteration 1

This document provides the conceptual domain model for the Cafe Restaurant POS system. It describes the real-world conceptual classes, attributes, and relationships identified during domain analysis, aligning directly with the Use Cases (UC1, UC2, UC5) and Functional Requirements (FR1–FR27).

---

## 1. Conceptual Class Diagram Overview

The domain model is decomposed into three primary logical clusters to organize the 15 accepted conceptual classes:
1. **Core Ordering Cluster**: Captures customer selections, dining tables, menu cataloging, and order tracking.
2. **Users & Subtypes (RBAC Cluster)**: Models system security, roles, and specialized staff behaviors (Cashier, Waiter, Manager, Admin, Kitchen Staff).
3. **Payment & Inventory Cluster**: Models financial transactions and tracking of stock thresholds with automated domain event alerts.

---

## 2. Data Dictionary

### 2.1. Core Ordering Cluster

#### Class: `Order`
* **Description**: Represents a customer's request for food and beverages. It tracks the lifecycle of the request from placement to service.
* **Attributes**:
    * `status`: `OrderStatus` (Enumeration: `{Placed, Preparing, Ready, Served}`) — Tracks the current preparation or fulfillment stage of the order (UC5).
    * `orderType`: `String` — Identifies if the order is "Dine-In" or "Takeaway" (UC1).

#### Class: `OrderLineItem`
* **Description**: A line item within an order representing a specific menu item and the quantity requested.
* **Attributes**:
    * `quantity`: `Integer` — The number of units of the associated menu item requested in this line.

#### Class: `MenuItem`
* **Description**: An individual food or beverage item offered by the cafe restaurant menu catalog (UC2).
* **Attributes**:
    * `name`: `String` — The unique public name of the menu item.
    * `price`: `Decimal` — The unit cost of the menu item in local currency.

#### Class: `MenuItemCategory`
* **Description**: A classification category (e.g., "Beverages", "Desserts", "Mains") used to group menu items for easier navigation (UC2).
* **Attributes**:
    * `name`: `String` — The unique name of the category.

#### Class: `Table`
* **Description**: A physical dining table in the restaurant where dine-in customers are seated.
* **Attributes**:
    * `tableNumber`: `Integer` — The unique identifier for the physical table.

---

### 2.2. Users & Subtypes (RBAC Cluster)

#### Class: `User` (Base Parent Class)
* **Description**: Represents any authenticated individual authorized to access the system terminal.
* **Attributes**:
    * `username`: `String` — The unique login credential name.
    * `passwordHash`: `String` — Secure cryptographic hash of the user's password.

#### Class: `Role`
* **Description**: A security access role that defines system permissions matching the Role-Based Access Control (RBAC) requirements.
* **Attributes**:
    * `roleName`: `String` — The name of the role (e.g., "Cashier", "Manager").

#### Class: `Cashier` (Subtype of `User`)
* **Description**: A user specialized in processing customer orders, payments, and receipt settlement (UC1).
* **Inherits**: All attributes of `User`.

#### Class: `Waiter` (Subtype of `User`)
* **Description**: A user specialized in placing table orders, serving prepared items, and updating order fulfillment statuses (UC1, UC5).
* **Inherits**: All attributes of `User`.

#### Class: `KitchenStaff` (Subtype of `User`)
* **Description**: A user specialized in viewing active orders, preparing items, and flagging orders as ready (UC5).
* **Inherits**: All attributes of `User`.

#### Class: `Manager` (Subtype of `User`)
* **Description**: A user with administrative privileges to manage menu configurations, handle stock alerts, and generate reports (UC2).
* **Inherits**: All attributes of `User`.

#### Class: `Administrator` (Subtype of `User`)
* **Description**: A user who handles core system maintenance, user account provisioning, and system-wide configurations.
* **Inherits**: All attributes of `User`.

---

### 2.3. Payment & Inventory Cluster

#### Class: `Payment`
* **Description**: A financial transaction representing the payment processed for a specific order (UC1).
* **Attributes**:
    * `method`: `PaymentMethod` (Enumeration: `{Cash, Card, MobileMoney}`) — The medium used to complete the transaction.
    * `amount`: `Decimal` — The total amount of money processed.
    * `timestamp`: `DateTime` — The exact date and time the payment was authorized.

#### Class: `InventoryItem`
* **Description**: A trackable ingredient or stock item stored in the kitchen inventory.
* **Attributes**:
    * `currentQuantity`: `Integer` — The physical stock level currently in storage.
    * `minimumThreshold`: `Integer` — The safety stock limit which triggers a notification if crossed.

#### Class: `LowStockAlert`
* **Description**: A persistent domain event record generated when an `InventoryItem` falls below its required safety threshold.
* **Attributes**:
    * `alertID`: `String` — A unique tracker code for the notification event.
    * `timestamp`: `DateTime` — The date and time the alert was triggered.
    * `isAcknowledged`: `Boolean` — Tracks whether a Manager has reviewed and dismissed the alert.

---

## 3. Enumeration Definitions

### Enumeration: `OrderStatus`
* **Values**:
    * `Placed`: The order has been recorded and submitted to the queue.
    * `Preparing`: Kitchen staff have acknowledged the order and are preparing the items.
    * `Ready`: The items are cooked/prepared and ready to be served.
    * `Served`: The waiter has physically delivered the items to the customer/table.

### Enumeration: `PaymentMethod`
* **Values**:
    * `Cash`: Hard currency transaction.
    * `Card`: Credit or debit card swipe terminal process.
    * `MobileMoney`: Digital mobile network wallet transfer.

---

## 4. Key Relationships and Multiplicities

### 4.1. Core Ordering Connections
* **`Order` [1] ——— [0..1] `Table`**
    * **Description**: An order may optionally be assigned to a physical dining table. For "Takeaway" order types, a table is not assigned (multiplicity `0`), solving the optionality constraint without redundant subclassing.
* **`Order` [1] ——— [1..*] `OrderLineItem`**
    * **Description**: An order must contain at least one line item (cannot be empty). An order line item belongs to exactly one order.
* **`OrderLineItem` [1..*] ——— [1] `MenuItem`**
    * **Description**: Each line item records the selection of exactly one specific menu item. A menu item can be selected across multiple line items in different orders.
* **`MenuItem` [*] ——— [1] `MenuItemCategory`**
    * **Description**: A menu item belongs to exactly one category. A category can contain many menu items.

### 4.2. Accountability and Security
* **`User` [1] ——— [*] `Order`**
    * **Description**: Tracks who created/took the order for accountability and subsequent cashier auditing (`takenBy` relationship).
* **`User` [*] ——— [1] `Role`**
    * **Description**: Models role assignments where each User is assigned exactly one Role, but any given Role can be shared by many Users.

### 4.3. Inventory and Transactional Triggers
* **`Order` [1] ——— [1] `Payment`**
    * **Description**: An order has exactly one payment instance mapping to its bill settlement.
* **`MenuItem` [\*] ——— [\*] `InventoryItem`**
    * **Description**: Connects menu sales to physical stock. A single menu item (e.g., "Latte") uses specific inventory ingredients (e.g., "Milk", "Coffee Beans").
* **`InventoryItem` [1] ——— [*] `LowStockAlert`**
    * **Description**: An inventory item can trigger multiple historic alerts, but each alert traces back to exactly one parent stock item.