Leave Management System
-----------------------------

A simple Leave Management Web Application where employees can apply for leave and employers can approve or reject those requests.

This project was developed as part of a technical assignment and demonstrates a full-stack web application with authentication, role-based access control, and leave management functionality.

Live Application
------------------------

Frontend
----------

https://leave-management-system-iwf9.vercel.app

Backend API
------------

https://leave-management-system-backend-lh20.onrender.com

GitHub Repository
------------------

https://github.com/Seenivasan29/leave-management-system

Demo Login Credentials:
-----------------------

Employer (Admin)

Email : admin@test.com

Password : Admin123

Employee

Email : employee@test.com

Password : Emp123



Features:
---------

Employee Features:
-------------------

User login

Apply for leave

Select leave type

Enter start date and end date

Provide reason for leave

View leave status

Leave status types:

Pending

Approved

Rejected

View leave balance



Employer Features:
------------------

Login as employer

View all leave requests

Approve leave requests

Reject leave requests

Delete leave requests

Add new employees

Tech Stack:
-----------

Frontend
--------

Vue.js

Tailwind CSS

Backend
--------

Node.js

Express.js

Database
---------

MongoDB Atlas

Authentication

JSON Web Token (JWT)

bcrypt password hashing

Deployment
-----------

Frontend hosted on
Vercel

Backend hosted on
Render

Database hosted on
MongoDB Atlas

Project Setup (Local Development)
-----------------------------------

1 Clone Repository
git clone https://github.com/Seenivasan29/leave-management-system.git
2 Install Backend Dependencies
cd backend
npm install
3 Configure Environment Variables

Create .env file in backend folder

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secret123
4 Run Backend Server
node server.js

Backend will run on

http://localhost:5000
5 Install Frontend Dependencies
cd frontend
npm install
6 Run Frontend
npm run dev

Frontend will run on

http://localhost:5173


API Endpoints
---------------
Authentication

Signup User
--------------

POST /api/auth/signup

Example Request

{
"name":"John",
"email":"john@test.com",
"password":"123456",
"role":"employee"
}

Login User
----------

POST /api/auth/login

Example Request

{
"email":"admin@test.com",
"password":"Admin123"
}

Apply Leave
-------------

POST /api/leave/apply

Example Request

{
"employeeId":"EMP002",
"employeeName":"John",
"leaveType":"Annual Leave",
"startDate":"2026-03-10",
"endDate":"2026-03-12",
"reason":"Family function"
}

Get Employee Leaves
-------------------

GET /api/leave/employee/:employeeId

Get All Leaves
--------------

GET /api/leave

Approve Leave
---------------

PUT /api/leave/approve/:id

Reject Leave
------------

PUT /api/leave/reject/:id

Delete Leave
------------

DELETE /api/leave/:id


Deployment Instructions
-----------------------

Backend Deployment (Render)
-----------------------------

Push backend code to GitHub

Create new Web Service in Render

Connect GitHub repository

Set environment variables
-------------------------

PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secret123

Deploy backend

Backend URL example

https://leave-management-system-backend-lh20.onrender.com


Frontend Deployment (Vercel)
-------------------------------

Push frontend code to GitHub

Import repository into Vercel

Set build command

npm run build

Set output directory

dist

Deploy

Frontend URL example

https://leave-management-system-iwf9.vercel.app
