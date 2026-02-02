const Expense = require("../models/expense");
const User = require("../models/user");

exports.addExpense = async (req, res, next) => {
  try {
    const userExists = await User.findById(req.body.user);
    if (!userExists) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.getUserExpenses = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, category } = req.query;

    const query = { user: req.params.id };
    if (category) query.category = category;

    const expenses = await Expense.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.getMonthlySummary = async (req, res, next) => {
   try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const expenses = await Expense.find({
      user: user._id,
      date: { $gte: start, $lt: end },
    });

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({
      totalExpenses: totalSpent,
      remainingBudget: user.monthlyBudget - totalSpent,
      numberOfExpenses: expenses.length,
    });
  } catch (err) {
    next(err);
  }
};
