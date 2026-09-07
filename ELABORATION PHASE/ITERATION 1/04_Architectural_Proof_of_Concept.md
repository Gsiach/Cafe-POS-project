# Architectural Proof of Concept

**Project:** Cafe Restaurant POS System  
**Course:** CSC4630 — Advanced Software Engineering  
**Methodology:** Unified Process (UP) — Iterative & Incremental  
**Phase:** Elaboration — Iteration 1  
**Artifact:** Architectural Proof of Concept  
**Responsible Member:** Member D  

---

## 1. Purpose of the Architectural Proof of Concept

This document defines the proposed high-level architecture for the Cafe Restaurant POS System during the Elaboration Phase, Iteration 1.

The purpose of this artifact is to demonstrate that the major functional requirements, domain concepts, operational workflows, actors, deployment decision, and architectural constraints identified during Inception and domain analysis can be supported by a coherent system architecture.

This is an **architectural proof of concept**, not a complete implementation design. It therefore focuses on establishing the major architectural boundaries and responsibilities rather than specifying every class, method, database table, framework, or implementation detail.

The proposed architecture uses three primary layers:

1. **Presentation Layer**
2. **Application / Domain Layer**
3. **Data / Persistence Layer**

These layers provide separation between:

- how Users interact with the system;
- how the system coordinates operations and enforces business rules; and
- how system information is persistently stored and retrieved.

The architecture is specifically designed around the characteristics of this Cafe Restaurant POS System, particularly:

- Order processing;
- OrderItem handling;
- MenuItem and MenuItemCategory management;
- Table association for Dine-in Orders;
- Payment processing;
- User and Role management;
- the OrderStatus lifecycle;
- inventory and LowStockAlert information;
- Role-Based Access Control;
- Windows desktop deployment; and
- the **offline-first** operational requirement.

The offline-first requirement is particularly important because the system must remain useful for restaurant operations even when network connectivity is unavailable.

---

# 2. Architectural Scope

This proof of concept covers the architectural structure required for the current Elaboration Iteration 1 scope.

The architecture is intended to support the major system operations identified so far, including:

- **Process Customer Order**
- **Update Order Status**
- **Manage Menu**

It also provides architectural room for the additional functionality planned for later iterations, including:

- Generate Sales Report
- Update Inventory
- User Login

The architecture therefore establishes a foundation that can be extended during subsequent UP iterations without requiring the entire system structure to be discarded.

---

# 3. Architecture Goals

The architecture of the Cafe Restaurant POS System is designed to achieve the following goals:

- **Support core POS operations:** Provide a reliable foundation for Process Customer Order, Update Order Status, and Manage Menu.
- **Enable offline-first operation:** Allow essential POS operations to continue when network connectivity is unavailable, with locally persisted data available for later synchronization.
- **Define synchronization behavior:** Synchronization is triggered automatically when network connectivity is detected, with the local database serving as the primary data store during offline periods.
- **Separate responsibilities:** Clearly separate the Presentation, Application / Domain, and Data / Persistence layers to improve maintainability and reduce coupling.
- **Enforce business rules:** Centralize important rules such as OrderStatus transitions, Role-Based Access Control, MenuItem availability, and Order validation within the Application / Domain layer.
- **Support multiple Users and Roles:** Provide appropriate access for Cashier, Waiter, Kitchen Staff, Manager, and Administrator.
- **Support Windows desktop deployment:** Ensure the architecture is suitable for the established Windows desktop deployment decision.
- **Provide a foundation for future iterations:** Allow additional functionality such as Generate Sales Report, Update Inventory, and User Login to be incorporated without fundamentally restructuring the system.
- **Reduce architectural risk:** Validate the major architectural decisions and constraints during the Elaboration phase before detailed implementation begins.

# 4. Architectural Drivers

The architecture is influenced by several important requirements and decisions already established for the project.

| Architectural Driver | Architectural Implication |
|---|---|
| Order processing | The architecture must support creation and persistence of Orders and their OrderItems |
| Order lifecycle | OrderStatus must be controlled by application/domain rules |
| Multiple actors | Different Users must be able to interact with the same Order at different stages |
| RBAC | Authorization must be enforced according to User roles |
| Payment | Payment must be associated with the relevant Order |
| Menu management | MenuItem and MenuItemCategory information must be managed and persisted |
| Table association | Dine-in Orders require association with a physical Table |
| Inventory | InventoryItem and LowStockAlert information must be supported |
| Offline-first | Core POS operations must remain available without network connectivity |
| Windows deployment | The system is designed as a Windows desktop application |
| Persistence | Orders, Payments, Users, MenuItems and other important information must survive beyond an individual screen interaction |
| Maintainability | Responsibilities should be separated rather than concentrated in one part of the system |
| Future iterations | The architecture must provide a foundation for further design and implementation |

These drivers form the basis for the proposed layered architecture.

---

# 5. Proposed Architectural Style

The Cafe Restaurant POS System will use a **layered architecture**.

The three primary layers are:

```text
+------------------------------------------------------+
|                  PRESENTATION LAYER                  |
|                                                      |
|       Windows Desktop User Interface                 |
|       Login | Orders | Menu | Status | Reports      |
+-----------------------------+------------------------+
                              |
                              v
+------------------------------------------------------+
|             APPLICATION / DOMAIN LAYER              |
|                                                      |
|  Use-Case Coordination | Business Rules | RBAC       |
|  Order Processing      | Payment        | Menu       |
|  OrderStatus           | Inventory      | Reporting  |
+-----------------------------+------------------------+
                              |
                              v
+------------------------------------------------------+
|                DATA / PERSISTENCE LAYER              |
|                                                      |
|  Persistence Services | Local Operational Data       |
|  Order Data | Menu Data | User Data | Inventory      |
|  Payment Data | LowStockAlert Data                   |
+------------------------------------------------------+ 

Payment processing is initiated as part of the **Process Customer Order** workflow through the **Order Management** component. There is no separate Payment UI. After the order details and payment method have been confirmed, Order Management invokes the **Payment Processing** component, which applies the relevant payment processing and business rules before the payment is persisted through the repository layer. This reflects the domain requirement that payment occurs as part of completing an order rather than as a separate workflow.

The Data / Persistence Layer supports offline-first operation through the Local Database and Synchronization components. The Local Database serves as the primary data store during offline periods, allowing essential POS operations to continue without network connectivity. Synchronization is triggered automatically when network connectivity is detected, at which point locally stored data can be synchronized with the Remote Database. This allows the system to continue operating locally while maintaining a mechanism for restoring consistency with the remote data store when connectivity becomes available.