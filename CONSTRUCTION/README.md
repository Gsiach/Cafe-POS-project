# Construction Phase
Project: Cafe Restaurant POS System
Stack: React + Vite + Supabase
Phase: Construction (Iterations 3-4)

## Setup Instructions

Prerequisites: Node.js v18+, npm v9+, Supabase account

Installation:
  cd cafe-pos-app
  npm install

Environment Setup:
  Create a .env file in cafe-pos-app/ with:
  VITE_SUPABASE_URL=your_project_url
  VITE_SUPABASE_ANON_KEY=your_anon_key

Run Development Server:
  npm run dev

## Key Scenarios for Demo
1. Login as Cashier - Place an order
2. Login as KitchenStaff - Mark order Preparing then Ready
3. Login as Waiter - Mark order Served

## Branch Naming
construction/login-screen
construction/order-entry
construction/kitchen-display
construction/waiter-orders
construction/manager-dashboard

## Defect Tracking
All bugs logged in defect_tracking.md
