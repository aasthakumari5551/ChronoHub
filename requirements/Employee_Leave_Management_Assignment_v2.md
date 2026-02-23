# Employee Leave Management System – Full Stack
## Project Assignment (Updated)

## Project Goal / Purpose
Build a full-stack Employee Leave Management System that simulates a real company HR workflow. The application must allow employees to request leave, managers to approve or reject requests, and admins to manage users and permissions. Students must implement authentication, authorization, role-based dashboards, routing, and global state management using modern industry practices.

## Mandatory Tech Stack
1. **Frontend:** React.js with Tailwind CSS
2. **Routing:** React Router (Mandatory)
3. **State Management:** Context API (Mandatory)
4. **Backend:** Node.js with Express.js
5. **Database:** MongoDB
6. **Authentication:** JWT (JSON Web Token)
7. **Authorization:** Role-Based Access Control (Admin, Manager, Employee)

## Optional Enhancements
1. Chart.js for analytics dashboards
2. Toast notifications
3. Responsive design improvements

## Core Functional Requirements
1. User Authentication (Login/Register) with JWT
2. Role-Based Dashboards
3. Apply Leave Form
4. Leave Approval Workflow
5. Leave Status Tracking (Pending / Approved / Rejected)
6. Protected Routes using React Router
7. Backend Authorization Middleware
8. Global Auth State using Context API

## Important Points While Building
1. Follow industry folder structure (controllers, routes, models, middleware, config).
2. Use .env file for secrets like JWT key and MongoDB URI.
3. Implement loading and error states in React UI.
4. Create reusable components using Tailwind CSS.
5. Validate API request data before saving to database.
6. Implement role-based route protection on frontend and backend.
7. Maintain a proper GitHub README with setup steps and screenshots.

## Rubrics & Grading System (100 Marks)

| Criteria | Marks |
|----------|-------|
| Authentication & Security Implementation | 20 |
| Role-Based Authorization Logic | 20 |
| Frontend UI (Tailwind + Routing + Context API) | 15 |
| Backend API Structure & Middleware | 15 |
| Database Design (MongoDB) | 10 |
| Code Quality & Folder Structure | 10 |
| README & Documentation | 5 |
| Bonus Features / Innovation | 5 |

## Basic Wireframe Structure
1. **Login Page** – Logo Area, Login Form, Action Buttons
2. **Employee Dashboard** – Sidebar, Leave Summary Cards, Apply Leave Button
3. **Manager Dashboard** – Leave Requests Table with Approve/Reject
4. **Admin Panel** – User Management and Role Assignment
