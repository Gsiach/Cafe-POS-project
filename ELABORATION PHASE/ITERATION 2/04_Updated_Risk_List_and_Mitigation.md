# 04. Updated Risk List and Risk Assessment Matrix

## 1. Document Overview & Phase Context
This document updates the project's risk analysis based on architectural insights, design decisions, and team workflows established during the **Elaboration Phase (Iteration 2)**. 

As the project transitioned from initial domain requirements to concrete design models (Design Class Diagrams, sequence diagrams, and architecture specifications), existing operational and technical risks were re-evaluated. Furthermore, project management risks—specifically tight submission timelines and version control coordination across branches—were identified and integrated into the project's risk baseline.

---

## 2. Updated Risk Identification and Mitigation Strategies

### (a) Technical Risks (System Failure)
* **R1: Server / Network Downtime**
  * **Description:** If the local network or cloud database connection fails during active cafe service, order processing and checkout operations could stall.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 5 (Critical)
  * **Mitigation Strategy & Implemented Actions:** Architected an **Offline-First / Local-First Architecture**. Transactions are persisted locally during an outage and automatically synchronized with the central cloud database once network connectivity is restored.

### (b) Operational & Project Management Risks
* **R2: Staff Resistance & High Learning Curve**
  * **Description:** High staff turnover or overly complex user interfaces could lead to ordering delays and increased input errors during peak cafe service hours.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 2 (Low)
  * **Mitigation Strategy & Implemented Actions:** Designed an intuitive, touch-friendly UI that mimics common smartphone interactions to minimize click counts and employee training overhead. User Acceptance Testing (UAT) protocol established prior to full rollout.

* **R3: Tight Project Timeline & Submission Deadlines (NEW)**
  * **Description:** Managing a strict upcoming submission deadline alongside multiple parallel design artifacts (Design Class Diagrams, markdown documentation, and trace matrices) risks rushed peer reviews or incomplete technical deliverables.
  * **Updated Assessment:** Probability: 4 (High) | Impact: 4 (High)
  * **Mitigation Strategy & Implemented Actions:** Standardized task distribution across team members, focused on Minimum Viable Product (MVP) core deliverables, and established internal peer-review milestones ahead of final pull requests.

* **R4: Team Coordination & Git Version Control Bottlenecks (NEW)**
  * **Description:** Concurrent edits across shared repository files (such as markdown specifications and `.drawio` / `.png` diagram assets) could cause merge conflicts, broken image paths, or lost commits across branches.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 3 (Moderate)
  * **Mitigation Strategy & Implemented Actions:** Enforced isolated feature-branch workflows (e.g., `elaboration/iteration-2-risk-list`), restricted direct commits to `main`, and required peer-reviewed GitHub Pull Requests (PRs) before merging.

### (c) Security & Data Privacy Risks
* **R5: Unauthorized Access & Data Breach**
  * **Description:** Unauthorized access to manager-level financial reports or employee records could lead to internal theft, loss of business intelligence, or non-compliance with data privacy laws.
  * **Updated Assessment:** Probability: 1 (Low) | Impact: 5 (Critical)
  * **Mitigation Strategy & Implemented Actions:** Enforced Role-Based Access Control (RBAC) at the class design level (restricting administrative operations to authorized `Manager` and `Administrator` roles). Mandated encryption at rest for sensitive credentials and ZRA tax compliance data in accordance with the Zambian Data Protection Act No. 3 of 2021.

### (d) Physical & Environmental Risks
* **R6: Hardware Damage in Kitchen Environments**
  * **Description:** Kitchen terminals and receipt printers operated in high-heat, high-moisture environments are vulnerable to grease, moisture, or heat damage.
  * **Updated Assessment:** Probability: 2 (Low) | Impact: 4 (High)
  * **Mitigation Strategy & Implemented Actions:** Positioned kitchen display terminals away from primary cooking and washing stations, mounting devices on elevated, protective stands.

* **R7: Theft or Damage of POS Terminals**
  * **Description:** Fixed desktop terminals in customer-facing counter areas remain exposed to opportunistic physical tampering, vandalism, or theft.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 3 (Moderate)
  * **Mitigation Strategy & Implemented Actions:** Secured counter terminals with lockable stands and configured software in a restricted "kiosk mode." Role-based login prevents unauthorized system entry, and administrators retain immediate account revocation privileges if a terminal is compromised.

---

## 3. Updated Risk Assessment & Priority Matrix

The priority score is calculated using the standard formula: **Priority Score = Probability (1–5) × Impact (1–5)**.

| Risk ID | Description | Category | Probability (1-5) | Impact (1-5) | Priority Score | Mitigation Strategy & Actual Actions Taken |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **R1** | **Server/Network Downtime** | Technical | 3 | 5 | **15 (High)** | Local-First Sync / Offline Mode database persistence. |
| **R2** | **Staff Resistance / Learning Curve** | Operational | 3 | 2 | **6 (Low)** | Intuitive smartphone-like UI design and streamlined ordering flows. |
| **R3** | **Tight Timeline & Monday Deadline** | Project Mgmt | 4 | 4 | **16 (High)** | Task breakdown, MVP scope control, and staged submission targets. |
| **R4** | **Team Coordination & Git Conflicts** | Project Mgmt | 3 | 3 | **9 (Med)** | Isolated feature branches (`elaboration/iteration-1-domain-model`) and PR reviews. |
| **R5** | **Data Breach / Unauthorized Access** | Security | 1 | 5 | **5 (Low)** | Enforced RBAC and encryption of sensitive data at rest. |
| **R6** | **Hardware Damage in Kitchen** | Physical | 2 | 4 | **8 (Med)** | Protective mounting away from heat, grease, and moisture. |
| **R7** | **Theft or Damage of POS Terminals** | Physical | 3 | 3 | **9 (Med)** | Lockable stands, kiosk mode, and administrative credential revocation. |

---

## 4. Summary of Iteration 2 Risk Management

The transition into the Elaboration Phase successfully refined the system's risk baseline from high-level assumptions into concrete architectural controls. By combining software safeguards (Offline-First sync, RBAC encapsulation, and data encryption) with structured team workflows (Git feature branches, PR reviews, and MVP scope management), the project effectively mitigates both technical system failures and team delivery risks prior to full implementation.