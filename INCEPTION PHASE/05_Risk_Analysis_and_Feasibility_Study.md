
# Executive Summary
--------------------
This project implements a computerized Point of Sale (POS) system to modernize cafe operations. By automating the checkout process and syncing real-time inventory with sales data, the system will increase operational efficiency and elevate the customer experience.

# Feasibility Study
--------------------
1. TECHNICAL FEASIBILITY: Technical feasibility is the process of evaluating whether a product idea or feature can realistically be built using your team’s current technology, skills, and resources[1]

(a) Technical Architecture: The proposed POS system will be built using a Client-Server architecture. All core functionalities such as order management, billing, and inventory will be implemented using industry-standard open-source libraries. The front-end will utilize modern, existing stable frameworks e.g. React to ensure a responsive UI optimized for desktop and laptop computers, with touch-friendly elements for optional touchscreen displays. Instead of building a custom database engine, we will implement an industry-standard SQL or NoSQL database to ensure data persistence.[1]

(b) Hardware Compartibiliy: The system wiil be optimised for industry-standard peripherals. The system will run on standard Windows-based desktop or laptop computers, which are widely available and within the project's hardware budget. A touch-friendly UI will be implemented to support optional touchscreen monitors where available. These computers provide the necessary processing power to handle concurrent requests without lagging, ensuring that order data is synced across all terminals in real-time. Waiters enter dine-in orders at fixed counter terminals before returning to serve the table.

(c) Team and Skills: As fourth-year students, our team has completed coursework in software engineering, database management, and networking, providing us with the technical foundation needed for this project. We estimate that high-level features like AI-driven inventory forecasting may be outside our current time constraints therefore, we are prioritizing a 'Minimum Viable Product' (MVP) that ensures stability and functionality over a large number of complex features.[1]

(d) Security and Compliance: To comply with data privacy, we will implement Role-Based Access Control (RBAC) so only managers can view financial reports.

(e) Dependencies: The success of the project relies on several external factors, primarily the availability of reliable third-party APIs for payment processing (e.g pesapal) and the physical hardware adopted. we are, therefore, designing the software with "offline-first" capabilities so that the cafe can continue taking orders even if the external third-party API is temporarily unavailable.[1]

------------------
2. ECONOMIC FEASIBILITY: This section evaluates the financial viability of the POS system by comparing the estimated development costs against the long-term economic gains for the restaurant.[2]

(a) Cost-Benefit Analysis: The primary economic justification for this project lies in the transition from manual to automated processes. While there is an initial cost in terms of hardware acquisition e.g. desktop/laptop computers, printers and development time and labor, the system is designed to pay for itself within the first few months of operation through labor savings, error reduction and increased number of processed sales per quarter i.e more customers serviced over a given period of time. This will result in a positive Return on Investment(ROI).[2]

(b) Revenue Growth via Operational Efficiency:
    
    (i) Increased Daily Sales Volume: A faster ordering and payment flow allows the cafe to serve more customers during peak hours, directly increasing the total number of transactions processed per day.
    (ii) Customer Retention and Loyalty: Faster service times and a reduction in order errors lead to a higher quality of service. This improved customer experience promotes repeat business and long-term customer retention, which is more cost-effective than acquiring new customers through marketing.

(c)Labor Optimization and Automated Data Processing: A significant economic advantage of the proposed system is the elimination of manual data entry. It enables 'automated analytics' as it captures every transaction in real-time, generating instant financial reports. This removes the need for a dedicated administrative person to process sales data.[2]

(d) Long-term Scalability and Maintenance: Because the system is built on a scalable technical stack, future updates and the addition of new menu items can be handled internally without requiring expensive third-party consultations. This low maintenance design will save costs as the business grows or expands.

--------------------
3. OPERATIONAL FEASIBILITY: This section examines how well the proposed POS system fits the daily workflows of the cafe and whether the staff can effectively integrate the technology into their service routine.[1,2]

(a) User Adoption and Learning Curve: We have designed the user interface (UI) to be highly intuitive, utilizing an approach that mimics common smartphone interactions. By reducing the number of "clicks" required to complete an order, we minimize the training time required for new employees. A simplified layout ensures that even during rush hours, the risk of human error in order entry is significantly reduced.[2]

(b) Workflow Integration and Service Speed: The system is engineered to enhance existing cafe workflows. The transition from manual ticket-writing to digital entry allows for instantaneous communication between the dining area and the kitchen. This facilitates real time updates i.e. kitchen staff receive orders immediately on a display or printer, eliminating the need for servers to walk back and forth. By automating the calculation of taxes, discounts, and split bills, the system ensures that every customer receives a consistent and professional checkout experience, regardless of which staff member is operating the terminal.[2]

(d) Management Oversight and Data Accessibility: For management, the system provides operational transparency that was previously impossible with manual methods. Managers can monitor live sales data, track inventory levels, and identify "peak hour" trends from a centralized dashboard. This data-driven approach allows for better staff scheduling and stock management, ensuring the cafe is always prepared for customer demand.

--------------------
4. LEGAL FEASIBILITY: This section evaluates the project’s compliance with the statutory and regulatory frameworks of the Republic of Zambia.

(a) Data Protection and Privacy: The cafe will act as a "Data Controller," ensuring that personal information is collected for explicit and legitimate purposes. In line with the Data Protection Act No. 3 of 2021, we will implement access controls to prevent unauthorized access to sensitive data, ensuring the "Right to Privacy" as enshrined in the Zambian Constitution.[5]

(b) Cyber Security: Our technical architecture includes secure logging features to provide an audit trail in the event of a forensic investigation or financial dispute hence adhering to the Cyber Security and Cyber Crimes Act No. 2 of 2021 and the Electronic Communications and Transactions Act No. 4 of 2021.[5]

(c) Consumer Protection: The system complies with the Competition and Consumer Protection Act No. 24 of 2010 by ensuring transparency in pricing and billing. The POS prevents "unfair trading practices" by ensuring the price displayed to the customer on the menu matches the final digital invoice. By providing a receipt, the system protects the consumer’s right to information and provides valid proof of purchase for any future claims or refunds.[5]

# Risk Analysis and Mitigation
-------------------------------

This section identifies potential threats to the project’s success and outlines strategies to prevent or minimize their impact on the cafe’s operations.[3,4]

### (a) Technical Risks (System Failure)
* **R1: Server / Network Downtime**
  * **Description:** If the local network or cloud connection fails during service, checkout operations could stall.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 5 (Critical)
  * **Mitigation Strategy & Implemented Actions:** Architected an **Offline-First / Local-First Architecture** using a local database storage engine. Transactions are persisted locally during an outage and automatically synchronized with the cloud/central repository once connectivity is re-established.[4]

### (b) Operational & Project Management Risks
* **R2: High Learning Curve & Staff Resistance**
  * **Description:** High staff turnover or non-intuitive user interfaces could lead to ordering delays and increased input errors during peak cafe hours.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 2 (Low)
  * **Mitigation Strategy & Implemented Actions:** Conducted User Acceptance Testing (UAT) with simplified, touch-friendly UI layouts that mimic common smartphone workflows to minimize click counts and training overhead.[4]

* **R3: Tight Project Timeline & Upcoming Deadlines**
  * **Description:** With a strict upcoming deadline (e.g., Monday deliverable) and multiple parallel design artifacts required (Design Class Diagrams, markdown specifications, risk matrices), there is a risk of incomplete deliverables or rushed peer review.
  * **Updated Assessment:** Probability: 4 (High) | Impact: 4 (High)
  * **Mitigation Strategy & Implemented Actions:** Standardized task division across team members, utilized automated diagram generation tools, prioritized Minimum Viable Product (MVP) core requirements, and set strict internal review checkpoints prior to final Git pull requests.

* **R4: Team Coordination & Version Control Bottlenecks**
  * **Description:** Concurrent edits across shared repository files (such as markdown documentation and diagram image assets) could lead to merge conflicts, lost work, or broken references across branches.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 3 (Moderate)
  * **Mitigation Strategy & Implemented Actions:** Enforced feature-branch workflows (`git checkout -b elaboration/iteration-2-risk-list`), isolated file responsibilities per team member, and instituted mandatory peer reviews before merging into the `main` branch.

### (c) Security & Data Privacy Risks
* **R5: Unauthorized Access & Data Breach**
  * **Description:** Compromise of administrative or managerial accounts could result in leaked financial reporting or unauthorized modification of system settings.
  * **Updated Assessment:** Probability: 1 (Low) | Impact: 5 (Critical)
  * **Mitigation Strategy & Implemented Actions:** Enforced Role-Based Access Control (RBAC) at the architectural level (restricting managerial functions to `Manager` and `Administrator` roles) and mandated encryption for sensitive credentials and ZRA tax compliance data at rest.[5]

### (d) Physical & Environmental Risks
* **R6: Hardware Damage in Kitchen Environments**
  * **Description:** Kitchen terminals and receipt printers are exposed to high heat, moisture, grease, and accidental spills.
  * **Updated Assessment:** Probability: 2 (Low) | Impact: 4 (High)
  * **Mitigation Strategy & Implemented Actions:** Designed terminal placement specifications requiring kitchen displays to be mounted on protective, elevated stands positioned safely away from primary cooking and washing stations.[4]

* **R7: Theft or Vandalism of POS Terminals**
  * **Description:** Fixed terminal hardware located in customer-facing counter areas remains a target for opportunistic theft or physical tampering.
  * **Updated Assessment:** Probability: 3 (Moderate) | Impact: 3 (Moderate)
  * **Mitigation Strategy & Implemented Actions:** Terminals are physically secured via lockable stands and configured in restricted "kiosk mode." Role-based authentication prevents unauthorized use, and administrative accounts can instantly revoke compromised user credentials.

---

# Risk matrix table
-------------------
### Risk Assessment & Priority Matrix
[4]

The priority score is calculated using the formula: **Priority Score = Probability (1–5) × Impact (1–5)**.

| Risk ID | Description | Category | Probability (1-5) | Impact (1-5) | Priority Score | Mitigation Strategy & Actual Actions Taken |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **R1** | **Server/Network Downtime** | Technical | 3 | 5 | **15 (High)** | Local-First Sync / Offline Mode database persistence. |
| **R2** | **Staff Resistance / Learning Curve** | Operational | 3 | 2 | **6 (Low)** | Intuitive smartphone-like UI design and streamlined ordering flows. |
| **R3** | **Tight Timeline & Monday Deadline** | Project Mgmt | 4 | 4 | **16 (High)** | Task breakdown, MVP scope control, and staged submission targets. |
| **R4** | **Team Coordination & Git Conflicts** | Project Mgmt | 3 | 3 | **9 (Med)** | Isolated feature branches (`elaboration/iteration-1-domain-model`) and PR reviews. |
| **R5** | **Data Breach / Unauthorized Access** | Security | 1 | 5 | **5 (Med)** | Enforced RBAC and encryption of sensitive data at rest. |
| **R6** | **Hardware Damage in Kitchen** | Physical | 2 | 4 | **8 (Med)** | Protective mounting away from heat, grease, and moisture. |
| **R7** | **Theft or Damage of POS Terminals** | Physical | 3 | 3 | **9 (Med)** | Lockable stands, kiosk mode, and administrative credential revocation. |

# Conclusion
----------------

Based on the comprehensive feasibility study and risk analysis conducted, the development of the cafe small restaurant POS System is deemed highly viable and is recommended for immediate implementation. Therefore we have come to a 'Go Decision'.

## Summary of Findings
------------------------

(a) Technical Viability: The project utilizes stable, modern open-source libraries that the development team is well-versed in. By implementing an offline-first architecture, the system ensures 100% uptime regardless of internet stability or server availability.

(b) Economic Impact: The system provides a clear Return on Investment (ROI) by increasing daily sales volume through faster checkout times and reducing administrative overhead by automating sales data processing.

(c) Operational Readiness: The user-centric design minimizes the learning curve for staff, ensuring that the system enhances rather than disrupts the current service workflow.

(d) Legal Compliance: The system fully adheres to the Zambian Data Protection Act of 2021 and is architected to integrate seamlessly with the ZRA system, ensuring long-term regulatory compliance.

# References
-------------------------
[1] Janna Bastow, "Technical Feasibility," Prodpad, Oct. 13, 2025. [Online]. Available:[text](https://www.prodpad.com/glossary/technical-feasibility/)

[2] iCertGlobal, "5 Types of Feasibilty Studies for Project Success," Apr. 28, 2025. [Online]. Available: [text](https://www.icertglobal.com/blog/5-types-of-feasibility-studies-for-project-success-blog)

[3] geeksforgeeks, "Short note on Risk Assessment and Risk Mitigation," Apr. 25,2024. [Online]. Avaialble: [text](https://www.geeksforgeeks.org/software-engineering/short-note-on-risk-assessment-and-risk-mitigation/)

[4] Sumisha Surendran, "Chapter 7: Risk Assessment and Mitigation," Open Library Publishing Platform, 2022. [Online]. Available: [text](https://ecampusontario.pressbooks.pub/techadapt/chapter/chapter-7-risk-assessment-and-mitigation/)

[5] Government of the Republic of Zambia, "The Constitution of Zambia (Amendment) Act, No. 2 of 2016," Lusaka, Zambia: Government Printers, 2016.
