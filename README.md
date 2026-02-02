# Expense Tracker Backend

This project is a backend service for a Personal Expense Tracker application. It allows users to create profiles, add expenses under predefined categories, view expenses with pagination and filtering, and generate a monthly expense summary.

The project focuses on backend fundamentals such as REST API design, MongoDB schema modeling, validations, pagination, filtering, and aggregation.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Configuration:** dotenv

## Project Setup

### 1. Install Dependencies
```bash
npm install

```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/expense-tracker

```

### 3. Start the Server

```bash
npm start

```

The server will run on: `http://localhost:3000`

---

## Database Configuration

### Current Setup (Local)

To ensure timely completion of the assignment, the project currently uses a **local MongoDB instance**.
The codebase remains compatible with MongoDB Atlas and can be switched simply by updating the `MONGO_URI` value in the `.env` file.

### Note on MongoDB Atlas

MongoDB Atlas was initially planned for hosting. Approximately **3–4 hours** were spent attempting to connect, including checking IP whitelists, verifying connection strings, and troubleshooting with documentation and AI tools. However, due to network/IP restrictions in the current environment, the connection could not be established.

---

## Data Models

### 1. User

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | User's full name |
| `email` | String | Unique email address |
| `monthlyBudget` | Number | The user's budget limit |

### 2. Expense

| Field | Type | Description |
| --- | --- | --- |
| `title` | String | Description of the expense |
| `amount` | Number | Cost of the expense |
| `category` | Enum | See supported categories below |
| `date` | Date | Date of transaction |
| `user` | ObjectId | Reference to the User model |

**Supported Categories:**

* Food
* Travel
* Shopping
* Electronics
* Entertainment

---

## API Endpoints

### User Management

* **Create User**
* `POST /users`


* **Get User by ID**
* `GET /users/:id`



### Expense Management

* **Add Expense**
* `POST /expenses`


* **Get User Expenses** (With Pagination & Filtering)
* `GET /users/:id/expenses`
* **Query Parameters:**
* `page`: Page number
* `limit`: Items per page
* `category`: Filter by category name
* `startDate`: Filter from date
* `endDate`: Filter to date





### Analytics

* **Monthly Expense Summary**
* `GET /users/:id/summary`
* *Returns total spending aggregated by the current month.*



---

## Features Implemented

*  **User Management:** Creation and retrieval of user profiles.
*  **Expense Tracking:** Creation with validation and fixed category enforcement.
*  **Advanced Querying:** Pagination (using `skip` and `limit`) and filtering by category/date.
*  **Aggregation:** Monthly summary calculation using MongoDB aggregation pipeline.
*  **Security/Config:** Environment-based configuration using `dotenv`.

---

## Assumptions & Notes

### Assumptions

* Authentication (Login/Signup) was not required for this specific assignment.
* Each expense is associated with a valid existing User ID.
* The monthly summary is calculated specifically for the current calendar month.
* Expense categories are strict; custom categories are not currently supported.

### Notes

* The `.env` file is excluded from version control for security.
* All API endpoints were manually tested using **Postman**.
* Clean code practices were followed to ensure a structured backend.

---

## AI Usage Declaration (Prompts Used)

AI assistance (LLMs) was used strictly for guidance and troubleshooting in the following areas:

1. **Logic:** Assistance with writing the specific pagination logic.
2. **Troubleshooting:** Debugging MongoDB Atlas connection issues (approx. 4 hours).

*No code was directly copied; prompts were used solely for conceptual guidance and error resolution.*
