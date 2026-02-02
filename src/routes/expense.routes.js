const router = require("express").Router();
const {
  addExpense,
  getUserExpenses,
  getMonthlySummary
} = require("../controllers/expense.controller");

router.post("/expenses", addExpense);
router.get("/users/:id/expenses", getUserExpenses);
router.get("/users/:id/summary", getMonthlySummary);

module.exports = router;
