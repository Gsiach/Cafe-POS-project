# Remaining Use Cases
Cafe Restaurant POS System — Elaboration Phase, Iteration 2

This document contains the fully-dressed use cases for the remaining
scenarios deferred from Iteration 1. These use cases cover lower
architectural risk scenarios that build on the domain model and
architecture established in Iteration 1.

Use cases covered in this document:
- UC3: Generate Sales Report
- UC4: Update Inventory
- UC6: User Login

---

# UC3: Generate Sales Report

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Manager
**Stakeholders and Interests:**
- Manager — wants accurate, filterable sales data to make informed
  business decisions about menu pricing, staffing, and stock ordering
- Administrator — wants report access restricted to authorised roles
  only, enforcing RBAC
- Cafe Owner — wants visibility into revenue trends and staff
  performance without needing direct system access
- Cashier/Waiter — indirect stakeholder; their recorded orders
  contribute to the report data

**Preconditions:**
- Actor is logged into the system with Manager or Administrator role
- At least one completed Order with a Payment record exists in the
  system for the selected date range

**Success Guarantee (Postconditions):**
- A sales report is generated and displayed to the Actor covering
  the selected date range and report type
- The report accurately reflects all completed Orders and Payments
  within the selected period
- If export is requested, the report is saved in the selected format
  (PDF or Excel) and made available for download

**Main Success Scenario:**
1. Actor selects "Reports" from the main menu.
2. System displays the report configuration screen.
3. Actor selects report type from available options:
   - Daily Sales Summary
   - Sales by Menu Item
   - Sales by Staff Member
   - Sales by Payment Method
4. Actor selects the date range (start date and end date).
5. Actor selects "Generate Report."
6. System queries completed Orders and associated Payments within
   the selected date range and compiles the report data.
7. System displays the generated report on screen with:
   - Total revenue for the period
   - Number of orders processed
   - Breakdown by report type (by item, by staff, or by method)
8. Actor reviews the report.

**Extensions (Alternate and Error Flows):**

*5a. No data exists for the selected date range:*
  1. System displays: "No records found for the selected period."
  2. Actor selects a different date range or exits.
  3. Use case resumes at step 3.

*5b. Start date is after end date:*
  1. System displays: "Invalid date range. Start date must be
     before end date."
  2. Actor corrects the date range.
  3. Use case resumes at step 4.

*8a. Actor requests export:*
  1. Actor selects "Export Report."
  2. System prompts Actor to select export format: PDF or Excel.
  3. Actor selects format.
  4. System generates the file, named with report type and date
     range (e.g. "SalesReport_2025-01-01_2025-01-31.pdf").
  5. System makes the file available for download.
  6. Use case ends.

*8b. Export generation fails:*
  1. System displays: "Export failed. Please try again."
  2. Actor retries or exits.
  3. Use case resumes at step 8a.1.

**Special Requirements:**
- Report must generate within 3 seconds for date ranges up to
  90 days (NFR1)
- Report access restricted to Manager and Administrator roles (NFR6)
- Exported files must be clearly named with report type and date
  range

**Technology and Data Variations:**
- Export format: PDF (for printing and sharing) or Excel/CSV
  (for further analysis)
- Report data is drawn from Order, OrderLineItem, Payment, and
  User records already persisted in the system
- Date range selection via calendar date picker on screen

**Frequency of Occurrence:**
- Low to medium — typically generated at end of day, end of week,
  or on demand when business decisions are being made

---

# UC4: Update Inventory

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Manager / Administrator
**Stakeholders and Interests:**
- Manager — wants accurate, up-to-date stock levels to avoid running
  out of ingredients during service
- Administrator — wants full control over inventory records including
  adding new items and setting thresholds
- Kitchen Staff — indirect stakeholder; accurate inventory reflects
  what can actually be prepared
- Cashier/Waiter — indirect stakeholder; MenuItem availability
  depends on stock levels being accurate

**Preconditions:**
- For manual update: Actor is logged into the system with Manager
  or Administrator role
- For automatic deduction: An Order has been completed and Payment
  confirmed in UC1
- At least one InventoryItem record exists in the system

**Success Guarantee (Postconditions):**
- The InventoryItem record reflects the correct current stock level
- If currentQuantity falls below minimumThreshold after any update,
  a LowStockAlert is automatically generated and persisted
- All inventory changes are immediately reflected in the system

**Main Success Scenario (Manual Update):**
1. Actor selects "Inventory Management" from the main menu.
2. System displays the current list of InventoryItems with their
   currentQuantity and minimumThreshold values.
3. Actor selects an action:
   - Add New Item: Administrator enters item name, initial
     currentQuantity, and minimumThreshold. System creates a
     new InventoryItem record.
   - Update Stock Level: Actor selects an existing InventoryItem
     and enters the new currentQuantity (e.g. after a stock
     delivery). System updates the record.
   - Set Threshold: Actor selects an existing InventoryItem and
     updates its minimumThreshold value.
4. System saves the changes.
5. System checks whether currentQuantity is below minimumThreshold.
6. If below threshold: System generates a LowStockAlert record
   and displays a notification to the Actor.
7. System confirms the update and refreshes the inventory display.

**Automatic Deduction Sub-Flow (triggered by UC1):**
1. UC1 completes successfully — Order status is set to "Placed"
   and Payment is confirmed.
2. System identifies the InventoryItems associated with each
   OrderLineItem's MenuItem, using the ingredient quantity
   configuration defined by the Administrator (e.g. 1 Latte =
   200ml Milk + 18g Coffee Beans). This mapping is set up during
   system configuration and maintained by the Administrator.
3. System deducts the configured quantity from each associated
   InventoryItem's currentQuantity.
4. System checks whether any InventoryItem's currentQuantity has
   fallen below its minimumThreshold.
5. If below threshold: System generates a LowStockAlert record
   for the affected InventoryItem.
6. System persists all changes silently in the background —
   no Actor interaction required.

**Extensions (Alternate and Error Flows):**

*3a. Administrator attempts to add an InventoryItem with a
duplicate name:*
  1. System warns: "An inventory item with this name already
     exists."
  2. Administrator enters a unique name or cancels.
  3. Use case resumes at step 3.

*3b. Actor enters a negative quantity:*
  1. System rejects the input: "Quantity cannot be negative."
  2. Actor enters a valid quantity.
  3. Use case resumes at step 3.

*5a. LowStockAlert already exists for this InventoryItem and
has not been acknowledged:*
  1. System does not generate a duplicate alert.
  2. Existing unacknowledged alert remains active.
  3. Use case continues at step 7.

*6a. Manager acknowledges a LowStockAlert:*
  1. Manager selects the alert and marks it as acknowledged.
  2. System sets LowStockAlert.isAcknowledged to true.
  3. Alert is removed from the active notifications display.

**Special Requirements:**
- Automatic stock deduction must occur within the same transaction
  as Order completion — no deduction without a confirmed Payment (FR17)
- LowStockAlert must be generated immediately when threshold is
  crossed — not on a scheduled batch (FR18)
- Add New Item restricted to Administrator role only;
  Update Stock Level and Set Threshold available to Manager
  and Administrator (NFR6)

**Technology and Data Variations:**
- Quantities entered as integers (whole units)
- InventoryItem to MenuItem association and ingredient quantities
  managed by Administrator — defines which ingredients are consumed
  by which menu items and in what quantities
- LowStockAlert displayed as an on-screen notification banner
  on Manager and Administrator terminals

**Frequency of Occurrence:**
- Automatic deduction: High — triggered by every completed Order
- Manual update: Low to medium — typically after stock deliveries
  or when correcting discrepancies

---

# UC6: User Login

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Any System User (Cashier, Waiter, Manager,
Administrator, KitchenStaff)
**Stakeholders and Interests:**
- All Users — want quick, straightforward access to the system
  at the start of their shift
- Administrator — wants RBAC enforced so each User only accesses
  features permitted by their Role
- Manager — wants failed login attempts logged for security auditing

**Preconditions:**
- The system is running and displaying the login screen
- The User has been issued a valid username and password by
  the Administrator

**Success Guarantee (Postconditions):**
- The User is authenticated and granted access to the system
- The system displays the home screen appropriate to the User's Role
- The session is active and will auto-logout after 15 minutes
  of inactivity (NFR9)

**Main Success Scenario:**
1. User enters username and password on the login screen.
2. System validates the credentials against the User record.
3. System identifies the User's assigned Role.
4. System grants access and displays the home screen for that Role:
   - Cashier/Waiter: Order entry screen
   - KitchenStaff: Active Orders screen
   - Manager: Dashboard with reports and inventory overview
   - Administrator: System management screen

**Extensions (Alternate and Error Flows):**

*2a. Incorrect username or password:*
  1. System displays: "Invalid username or password."
  2. System increments the failed login attempt counter for
     that username.
  3. User retries. Use case resumes at step 1.

*2b. Account is locked after repeated failed attempts:*
  1. System displays: "Account locked due to too many failed
     login attempts. Contact your Administrator."
  2. User cannot proceed. Use case ends.
  3. Administrator must unlock the account before the User
     can log in again.

*2c. User leaves the login screen idle:*
  1. System times out and clears the username and password fields.
  2. Use case resumes at step 1.

**Special Requirements:**
- Passwords must be stored as cryptographic hashes — never
  plaintext (NFR6)
- Session must auto-logout after 15 minutes of inactivity (NFR9)
- Failed login attempts must be logged with timestamp for
  security auditing

**Technology and Data Variations:**
- Login via username and password only — no biometric or
  card-swipe authentication in current scope
- Account lockout threshold to be defined during Construction
  (suggested: 5 consecutive failed attempts)

**Frequency of Occurrence:**
- High — every User logs in at the start of each shift and
  after every auto-logout timeout