# Defect Tracking Log
**Project:** Cafe Restaurant POS System
**Phase:** Construction (Iterations 3-4)
Log every bug found during development — severity: High, Medium, Low.
| ID | Description | Severity | Reported By | Status | Resolved By | Resolution Notes |
|----|-------------|----------|-------------|--------|-------------|-----------------|
| D001 | Empty placeholder component files (OrderEntry, KitchenDisplay, ActiveOrders, ManagerDashboard) caused "does not provide an export named default" crash on app load | High | Nathan | Resolved | Nathan | Added minimal valid default exports to all four files, restored dev server |
| D002 | Row Level Security enabled by default on all tables with no policies attached, causing all Supabase reads to silently return 0 rows (406 error) and app to hang on "Loading..." after login | High | Nathan | Resolved | Nathan | Disabled RLS on all 10 tables via SQL Editor for demo purposes; documented as a known simplification, not production-safe |
| D003 | ActiveOrders.jsx still contained the original empty placeholder despite the real implementation being written earlier — the branch/commit for it was never actually created, so WaiterScreen's "Serve Orders" tab showed nothing even though the order was correctly marked Ready in the database | Medium | Nathan | Resolved | Nathan | Verified with cat, rewrote the file with the real realtime fetch + Mark Served logic, confirmed working against a live Ready order before merging |
