const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");

router.post("/expenses", expenseController.addExpense);
router.get("/users/:id/expenses", expenseController.getUserExpenses);
router.get("/users/:id/summary", expenseController.getMonthlySummary);

module.exports = router;