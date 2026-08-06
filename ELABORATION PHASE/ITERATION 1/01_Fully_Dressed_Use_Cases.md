# Fully Dressed Use Cases
Cafe Restaurant POS System — Elaboration Phase, Iteration 1

This document contains fully-dressed use cases for the three highest-priority,
architecturally significant scenarios identified for Iteration 1. These are
treated as drafts — written before the Domain Model is finalized — and will
receive a terminology alignment pass after the Domain Model is complete.

Use cases covered in this document:
- UC1: Process Customer Order
- UC2: Manage Menu
- UC5: Update Order Status

UC3 (Generate Sales Report) and UC4 (Update Inventory) are deferred to
Iteration 2 as lower architectural risk scenarios.

---

# UC1: Process Customer Order

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Cashier / Waiter
**Stakeholders and Interests:**
- Cashier/Waiter — wants to enter orders quickly and accurately with
  minimal steps
- Customer — wants their order recorded correctly and payment processed
  smoothly
- Kitchen Staff — wants to receive clear, complete order details
  immediately after payment
- Manager — wants every order recorded against the staff member who
  took it for accountability and reporting
- Administrator — wants RBAC enforced so only authenticated Cashiers
  and Waiters can create orders

**Preconditions:**
- Actor is logged into the system with Cashier or Waiter role
- Menu items are available and up to date in the system
- At least one payment method is operational (cash, card, or mobile money)

**Success Guarantee (Postconditions):**
- A new Order exists in the system with status set to "Placed"
- Each selected MenuItem is recorded as an OrderLineItem within the Order
- The Order is associated with the User who created it (takenBy)
- For dine-in orders: the Order is associated with the selected Table
- A Payment record exists against the Order with the correct amount
  and method
- Order details are sent to the kitchen for preparation
- A receipt is printed or displayed to the customer

**Main Success Scenario:**
1. Actor selects "New Order" on the system.
2. System prompts Actor to select order type: Counter or Dine-in.
3. [Counter] Actor selects Counter. System creates a new Order with
   no Table association.
   [Dine-in] Actor selects Dine-in. System prompts for table number.
   Actor enters table number. System associates the Order with the
   selected Table.
4. Actor searches or browses the menu and selects a MenuItem.
5. System adds the selected MenuItem as a new OrderLineItem on the Order,
   recording quantity and unit price.
6. Actor repeats step 4–5 until all items are entered.
7. Actor selects "Confirm Order."
8. System displays the Order summary with all OrderLineItems and the
   calculated total.
9. Actor selects payment method (Cash, Card, or MobileMoney).
10. System processes the Payment and records it against the Order.
11. System sets Order status to "Placed."
12. System sends the following Order details to the kitchen display:
    Order ID, order type (Counter or Dine-in), table number if Dine-in,
    and the list of OrderLineItems with item names and quantities.
13. System prints or displays receipt to the customer.

**Extensions (Alternate and Error Flows):**

*3a. Selected table number does not exist in the system:*
  1. System displays error: "Table not found."
  2. Actor re-enters a valid table number.
  3. Use case resumes at step 3.

*4a. MenuItem is marked as unavailable:*
  1. System flags the item as unavailable.
  2. Actor selects an alternative MenuItem or removes the selection.
  3. Use case resumes at step 4.

*7a. Actor wants to remove an OrderLineItem before confirming:*
  1. Actor selects the OrderLineItem and chooses "Remove."
  2. System removes the OrderLineItem from the Order.
  3. System recalculates the total.
  4. Use case resumes at step 6.

*7b. Actor cancels the order before confirming:*
  1. Actor selects "Cancel Order."
  2. System voids the Order. No Payment is created.
  3. Use case ends.

*10a. Card payment fails:*
  1. System notifies Actor: "Payment failed."
  2. Actor retries with the same method or selects an alternative
     payment method.
  3. Use case resumes at step 9.

**Special Requirements:**
- Payment processing must complete within 2 seconds (NFR1)
- UI must be operable via both mouse and touchscreen (NFR11)
- System must function in offline mode if network is unavailable (NFR4)
  — order is queued locally and synced when connection is restored

**Technology and Data Variations:**
- Payment method: Cash (manual entry of amount tendered, system calculates
  change), Card (integrated card terminal), MobileMoney (mobile payment
  integration)
- Receipt: printed via receipt printer (NFR20) or displayed on screen

**Frequency of Occurrence:**
- High — this is the most frequent operation in the system, occurring
  continuously during cafe operating hours

---

# UC2: Manage Menu

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Administrator / Manager
**Stakeholders and Interests:**
- Administrator — wants full control over menu items, categories,
  and pricing with immediate system-wide effect
- Manager — wants to mark items as unavailable quickly during service
  without needing Administrator access for routine changes
- Cashier/Waiter — wants the menu they see during order entry to
  accurately reflect what is actually available
- Customer — wants to be offered only items that are actually available

**Preconditions:**
- Actor is logged into the system with Administrator or Manager role
- For Administrator actions: full menu management access is confirmed
  by RBAC
- For Manager actions: limited menu access (availability toggle only)
  is confirmed by RBAC

**Success Guarantee (Postconditions):**
- The MenuItem record in the system reflects the changes made
- Changes are immediately visible on all order entry screens
- MenuItemCategory associations are updated if category was changed

**Main Success Scenario:**
1. Actor selects "Menu Management."
2. System displays the current list of MenuItems with their categories,
   prices, and availability status.
3. System presents available actions based on Actor role:
   - Administrator: Add Item, Edit Item, Remove Item, Toggle Availability
   - Manager: Toggle Availability only
4. [Administrator — Add Item] Administrator enters MenuItem details:
   name, category (MenuItemCategory), price, and availability status.
   System creates a new MenuItem record.
   [Administrator — Edit Item] Administrator selects an existing MenuItem
   and updates its details. System saves the changes.
   [Administrator — Remove Item] Administrator selects a MenuItem and
   confirms deletion. System removes the MenuItem record.
   [Administrator or Manager — Toggle Availability] Actor selects a
   MenuItem and toggles its availability status. System updates the
   MenuItem availability immediately across all order entry screens.
5. System confirms the action and refreshes the menu display.

**Extensions (Alternate and Error Flows):**

*4a. Administrator attempts to remove a MenuItem that exists in active orders:*
  1. System warns: "This item exists in active orders and cannot
     be removed until those orders are completed."
  2. Administrator cancels the removal or waits for active orders
     to complete.
  3. Use case resumes at step 3.

*4b. Administrator enters a duplicate MenuItem name:*
  1. System warns: "A menu item with this name already exists."
  2. Administrator enters a unique name or cancels.
  3. Use case resumes at step 4.

*5a. Actor cancels at any point:*
  1. System discards changes and returns to the menu list.
  2. Use case ends.

**Special Requirements:**
- Menu changes must be reflected on all terminals immediately (NFR1)
- Only Administrator and Manager roles may access Menu Management (NFR6)

**Technology and Data Variations:**
- MenuItemCategory is selected from a predefined list maintained
  by the Administrator
- Price entered as decimal value in local currency

**Frequency of Occurrence:**
- Low to medium — menu changes occur periodically, not continuously.
  Availability toggles during service may occur several times per day.

---

# UC5: Update Order Status

**Scope:** Cafe Restaurant POS System
**Level:** User Goal
**Primary Actor:** Kitchen Staff / Waiter
**Stakeholders and Interests:**
- Kitchen Staff — wants to update order status quickly as preparation
  progresses without navigating complex screens
- Waiter — wants to know immediately when an order is Ready so they
  can deliver it to the table without delay
- Manager — wants a real-time view of all active orders and their
  current status for operational oversight
- Cashier — wants confirmation that the order they placed has been
  received and is being prepared

**Preconditions:**
- Actor is logged into the system with Kitchen Staff or Waiter role
- At least one Order exists in the system with status "Placed"

**Success Guarantee (Postconditions):**
- The Order status is updated to the next valid state in the lifecycle
- The updated status is immediately visible to all relevant actors
- When an Order status reaches "Ready", the Active Orders list on
  Waiter's terminal is refreshed to display the updated status,
  making the Ready order visually prominent

**Main Success Scenario:**
1. Actor selects "Active Orders."
2. System displays all current Orders with their statuses and details.
3. Actor selects an Order to update.
4. System displays the current status of the selected Order.
5. Actor updates the Order status according to their role:
   - Kitchen Staff sets status to "Preparing" when preparation begins.
   - Kitchen Staff sets status to "Ready" when preparation is complete.
   - Waiter sets status to "Served" when the order is delivered to
     the table.
6. System saves the updated Order status.
7. System notifies the relevant actor of the status change:
   - When status is set to "Ready": Active Orders list on Waiter's
     terminal is refreshed to display the updated status, making the
     Ready order visually prominent.
8. System refreshes the Active Orders display to reflect the update.

**Extensions (Alternate and Error Flows):**

*5a. Actor attempts to skip a status in the lifecycle:*
  1. System rejects the update and displays:
     "Invalid status transition. Order must follow:
     Placed → Preparing → Ready → Served."
  2. Actor selects the correct next status.
  3. Use case resumes at step 5.

*5b. Kitchen Staff attempts to set status to "Served":*
  1. System rejects the update — "Served" transition is restricted
     to Waiter role only.
  2. Kitchen Staff sets status to "Ready" instead.
  3. Use case resumes at step 5.

*5c. Waiter attempts to set status to "Preparing" or "Ready":*
  1. System rejects the update — "Preparing" and "Ready" transitions
     are restricted to Kitchen Staff role only.
  2. Use case resumes at step 5.

*3a. Order was cancelled before Actor selected it:*
  1. System removes the cancelled Order from the Active Orders display.
  2. Actor selects a different Order or exits.
  3. Use case ends.

**Special Requirements:**
- Status updates must be reflected across all terminals immediately (NFR1)
- Role-based restrictions on status transitions must be enforced by
  the system, not just the UI (NFR6)

**Technology and Data Variations:**
- Notification method for "Ready" status: Active Orders list refresh
  on Waiter's terminal. No push notification infrastructure required —
  Waiter checks the Active Orders screen which reflects current status
  on each view. Audio alerts are a future enhancement candidate.

**Frequency of Occurrence:**
- High — every order goes through four status transitions. This use
  case executes multiple times per order, for every order placed.